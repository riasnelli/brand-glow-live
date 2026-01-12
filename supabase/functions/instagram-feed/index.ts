import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Allowed origins for CORS
const allowedOrigins = [
  'https://makeyourbrand.live',
  'https://www.makeyourbrand.live',
  'https://lovable.app',
  'https://lovable.dev',
]

// Match lovableproject.com subdomains for dev previews
const isAllowedOrigin = (origin: string | null): boolean => {
  if (!origin) return false
  if (allowedOrigins.includes(origin)) return true
  // Allow Lovable preview URLs
  if (/^https:\/\/[a-z0-9-]+\.lovableproject\.com$/.test(origin)) return true
  if (/^https:\/\/[a-z0-9-]+\.lovable\.app$/.test(origin)) return true
  return false
}

const getCorsHeaders = (origin: string | null) => ({
  'Access-Control-Allow-Origin': isAllowedOrigin(origin) ? origin! : allowedOrigins[0],
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
})

// ========== Simple in-memory rate limiting ==========
// Limits: 30 requests per minute per origin
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 30

interface RateLimitEntry {
  count: number
  windowStart: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    // New window
    rateLimitStore.set(key, { count: 1, windowStart: now })
    return false
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  entry.count++
  return false
}

// Clean up old entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
      rateLimitStore.delete(key)
    }
  }
}, 300_000)

// ========== Interfaces ==========
interface InstagramMedia {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  permalink: string
  caption?: string
  timestamp: string
}

interface InstagramResponse {
  data: InstagramMedia[]
  paging?: {
    cursors: {
      before: string
      after: string
    }
    next?: string
  }
}

// ========== Main Handler ==========
serve(async (req) => {
  const origin = req.headers.get('origin')
  const corsHeaders = getCorsHeaders(origin)

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Rate limiting by origin (or IP fallback)
  const rateLimitKey = origin || req.headers.get('x-forwarded-for') || 'unknown'
  if (isRateLimited(rateLimitKey)) {
    console.warn(`Rate limit exceeded for: ${rateLimitKey}`)
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    const accessToken = Deno.env.get('INSTAGRAM_ACCESS_TOKEN')
    
    if (!accessToken) {
      console.error('INSTAGRAM_ACCESS_TOKEN not configured')
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse and validate limit query param (1-50, default 12)
    const url = new URL(req.url)
    const rawLimit = url.searchParams.get('limit')

    // Strict validation: reject non-numeric values
    if (rawLimit !== null && !/^\d+$/.test(rawLimit)) {
      return new Response(
        JSON.stringify({ error: 'Invalid limit parameter. Must be a number between 1 and 50.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const parsedLimit = rawLimit ? parseInt(rawLimit, 10) : 12
    const limit = Math.min(50, Math.max(1, parsedLimit))

    // Fetch media from Instagram Graph API
    const instagramUrl = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&limit=${limit}&access_token=${accessToken}`
    
    console.log('Fetching Instagram feed...')
    
    const response = await fetch(instagramUrl)
    
    if (!response.ok) {
      // Log full error details server-side only
      const errorData = await response.json()
      console.error('Instagram API error:', JSON.stringify(errorData))
      
      // Return generic error to client (no internal details)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch Instagram feed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const data: InstagramResponse = await response.json()
    
    // Filter to only images and carousel albums, get thumbnail for videos
    const media = data.data.map((item) => ({
      id: item.id,
      type: item.media_type,
      imageUrl: item.media_type === 'VIDEO' ? item.thumbnail_url : item.media_url,
      permalink: item.permalink,
      caption: item.caption || '',
      timestamp: item.timestamp,
    }))

    console.log(`Successfully fetched ${media.length} Instagram posts`)

    return new Response(
      JSON.stringify({ media }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: unknown) {
    // Log full error server-side only
    console.error('Error fetching Instagram feed:', error)
    
    // Return generic error to client
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
