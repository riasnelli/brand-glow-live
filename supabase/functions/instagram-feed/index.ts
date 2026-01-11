import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const accessToken = Deno.env.get('INSTAGRAM_ACCESS_TOKEN')
    
    if (!accessToken) {
      console.error('INSTAGRAM_ACCESS_TOKEN not configured')
      return new Response(
        JSON.stringify({ error: 'Instagram access token not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse query params for limit
    const url = new URL(req.url)
    const limit = url.searchParams.get('limit') || '12'

    // Fetch media from Instagram Graph API
    const instagramUrl = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&limit=${limit}&access_token=${accessToken}`
    
    console.log('Fetching Instagram feed...')
    
    const response = await fetch(instagramUrl)
    
    if (!response.ok) {
      const errorData = await response.json()
      console.error('Instagram API error:', errorData)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch Instagram feed', details: errorData }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
    console.error('Error fetching Instagram feed:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
