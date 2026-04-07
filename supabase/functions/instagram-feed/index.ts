import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const accessToken = Deno.env.get("INSTAGRAM_ACCESS_TOKEN");

    if (!accessToken) {
      console.error("INSTAGRAM_ACCESS_TOKEN not found");
      return new Response(
        JSON.stringify({ error: "Instagram access token not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch media from Instagram Graph API - get all available posts
    const fields = "id,media_type,media_url,permalink,caption,timestamp,thumbnail_url,children{media_url,media_type}";
    const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}&limit=50`;

    console.log("Fetching Instagram feed...");
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Instagram API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Unable to load feed. Please try again later." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data: InstagramResponse = await response.json();

    // Transform the data to a cleaner format, including carousel children
    const media = data.data.map((item) => {
      // For carousel albums, get all child images
      let carouselImages: string[] = [];
      if (item.media_type === "CAROUSEL_ALBUM" && item.children?.data) {
        carouselImages = item.children.data
          .filter(child => child.media_type !== "VIDEO")
          .map(child => child.media_url);
      }
      
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

    console.log(`Successfully fetched ${media.length} Instagram posts`);

    return new Response(
      JSON.stringify({ media }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in instagram-feed function:", error);
    return new Response(
      JSON.stringify({ error: "Service temporarily unavailable" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
