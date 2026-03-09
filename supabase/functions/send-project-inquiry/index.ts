import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      projectType,
      projectTypeOther,
      brandName,
      industry,
      targetAudience,
      brandDescription,
      name,
      email,
      whatsapp,
      website,
    } = body;

    const projectTypes = (projectType || []).join(", ") + (projectTypeOther ? ` (${projectTypeOther})` : "");

    const emailBody = `
New Project Inquiry from MakeYourBrand.Live
============================================

PROJECT TYPE
${projectTypes}

BRAND DETAILS
Brand Name: ${brandName || "N/A"}
Industry: ${industry || "N/A"}
Target Audience: ${targetAudience || "N/A"}
Description: ${brandDescription || "N/A"}

CONTACT INFORMATION
Name: ${name}
Email: ${email}
WhatsApp: ${whatsapp || "N/A"}
Website: ${website || "N/A"}

============================================
Sent from makeyourbrand.live project inquiry form
    `.trim();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      // Fallback: log the inquiry if no email service configured
      console.log("=== PROJECT INQUIRY (no email service configured) ===");
      console.log(emailBody);
      console.log("=====================================================");

      return new Response(
        JSON.stringify({ success: true, note: "Inquiry logged (email service not configured)" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MakeYourBrand.Live <noreply@makeyourbrand.live>",
        to: ["hello@makeyourbrand.live"],
        reply_to: email,
        subject: `New Project Inquiry: ${brandName || name}`,
        text: emailBody,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(`Resend API error [${res.status}]: ${errorData}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
