import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InstagramMedia {
  id: string;
  media_type: string;
  media_url: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  thumbnail_url?: string;
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

    // Fetch media from Instagram Graph API
    const fields = "id,media_type,media_url,permalink,caption,timestamp,thumbnail_url";
    const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}&limit=12`;

    console.log("Fetching Instagram feed...");
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Instagram API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to fetch Instagram feed", details: errorText }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data: InstagramResponse = await response.json();

    // Transform the data to a cleaner format
    const media = data.data.map((item) => ({
      id: item.id,
      type: item.media_type,
      imageUrl: item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url,
      permalink: item.permalink,
      caption: item.caption,
      timestamp: item.timestamp,
    }));

    console.log(`Successfully fetched ${media.length} Instagram posts`);

    return new Response(
      JSON.stringify({ media }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in instagram-feed function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: "Internal server error", details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
