import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

interface CarouselChild {
  media_url: string;
  media_type: string;
}

interface InstagramMedia {
  id: string;
  media_type: string;
  media_url: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  thumbnail_url?: string;
  children?: {
    data: CarouselChild[];
  };
}

interface InstagramResponse {
  data: InstagramMedia[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

interface InstagramErrorResponse {
  error?: {
    code?: number;
    error_subcode?: number;
    type?: string;
  };
}

const CACHE_TTL_MS = 5 * 60 * 1000;
let cachedResponse: { media: ReturnType<typeof transformMedia>; expiresAt: number } | null = null;

function transformMedia(data: InstagramResponse) {
  return data.data
    .filter((item) => item.media_type === "VIDEO" ? Boolean(item.thumbnail_url) : Boolean(item.media_url))
    .map((item) => {
      const carouselImages = item.media_type === "CAROUSEL_ALBUM" && item.children?.data
        ? item.children.data
            .filter((child) => child.media_type !== "VIDEO" && Boolean(child.media_url))
            .map((child) => child.media_url)
        : [];

      return {
        id: item.id,
        type: item.media_type,
        imageUrl: item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url,
        permalink: item.permalink,
        caption: item.caption,
        timestamp: item.timestamp,
        carouselImages: carouselImages.length > 0 ? carouselImages : undefined,
      };
    });
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "GET" && req.method !== "POST") {
    return json({ error: "Method not allowed", code: "METHOD_NOT_ALLOWED" }, 405);
  }

  try {
    if (cachedResponse && cachedResponse.expiresAt > Date.now()) {
      return json({ media: cachedResponse.media, cached: true });
    }

    const accessToken = Deno.env.get("INSTAGRAM_ACCESS_TOKEN");

    if (!accessToken) {
      console.error("Instagram feed configuration is missing");
      return json({ error: "Instagram feed is not configured", code: "TOKEN_MISSING" }, 503);
    }

    const fields = "id,media_type,media_url,permalink,caption,timestamp,thumbnail_url,children{media_url,media_type}";
    const url = new URL("https://graph.instagram.com/me/media");
    url.searchParams.set("fields", fields);
    url.searchParams.set("access_token", accessToken);
    url.searchParams.set("limit", "50");

    const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });

    if (!response.ok) {
      const providerError = await response.json().catch(() => ({})) as InstagramErrorResponse;
      const providerCode = providerError.error?.code;
      const providerSubcode = providerError.error?.error_subcode;
      const isCredentialError = response.status === 401 || response.status === 403 || providerCode === 190;
      console.error("Instagram API rejected request", {
        status: response.status,
        code: providerCode,
        subcode: providerSubcode,
        type: providerError.error?.type,
      });
      return json({
        error: isCredentialError
          ? "Instagram authorization needs to be renewed."
          : "Instagram is temporarily unavailable.",
        code: isCredentialError ? "TOKEN_INVALID" : "PROVIDER_ERROR",
      }, isCredentialError ? 503 : 502);
    }

    const data: InstagramResponse = await response.json();
    if (!Array.isArray(data.data)) {
      console.error("Instagram API returned an unexpected response shape");
      return json({ error: "Instagram returned an invalid response.", code: "INVALID_RESPONSE" }, 502);
    }

    const media = transformMedia(data);
    cachedResponse = { media, expiresAt: Date.now() + CACHE_TTL_MS };

    console.log(`Successfully fetched ${media.length} Instagram posts`);
    return json({ media, cached: false });
  } catch (error: unknown) {
    const isTimeout = error instanceof DOMException && error.name === "TimeoutError";
    console.error("Instagram feed request failed", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message : "Unknown failure",
    });
    return json({
      error: isTimeout ? "Instagram took too long to respond." : "Instagram is temporarily unavailable.",
      code: isTimeout ? "PROVIDER_TIMEOUT" : "INTERNAL_ERROR",
    }, isTimeout ? 504 : 500);
  }
});
