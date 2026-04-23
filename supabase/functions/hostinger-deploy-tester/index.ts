import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://esm.sh/zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const buildSchema = z.object({
  version: z.string(),
  buildId: z.string(),
  label: z.string().optional(),
});

const requestSchema = z.object({
  domain: z.string().min(3).max(255),
  currentBuild: buildSchema,
  payload: z.record(z.unknown()).default({}),
});

const normalizeDomain = (input: string) => input.replace(/^https?:\/\//, "").replace(/\/.*$/, "").trim().toLowerCase();

const fetchDnsRecords = async (domain: string, type: "A" | "CNAME") => {
  const response = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`);
  const data = await response.json();
  return Array.isArray(data.Answer)
    ? data.Answer.map((answer: { data?: string }) => answer.data).filter(Boolean)
    : [];
};

const classifyEnvironment = (aRecords: string[], cnameRecords: string[]) => {
  if (aRecords.includes("185.158.133.1")) {
    return {
      environment: "Lovable published site",
      reason: "DNS A record points to Lovable hosting.",
    };
  }

  if (cnameRecords.some((record) => record.includes("lovable.app"))) {
    return {
      environment: "Lovable subdomain",
      reason: "DNS CNAME points to a lovable.app host.",
    };
  }

  if (cnameRecords.some((record) => record.includes("hostinger"))) {
    return {
      environment: "Hostinger",
      reason: "DNS CNAME points to Hostinger infrastructure.",
    };
  }

  return {
    environment: "Unknown / external host",
    reason: "DNS does not match the known Lovable hosting target.",
  };
};

const readRemoteBuildInfo = async (domain: string) => {
  try {
    const response = await fetch(`https://${domain}/build-info.json`, {
      headers: { "cache-control": "no-cache" },
    });

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: `Could not read remote build marker (${response.status})`,
      };
    }

    const contentType = response.headers.get("content-type") || "";
    const raw = await response.text();

    if (!contentType.includes("application/json")) {
      return {
        ok: false,
        status: response.status,
        error: "Remote host returned HTML instead of a build marker JSON file",
        preview: raw.slice(0, 200),
      };
    }

    return {
      ok: true,
      status: response.status,
      data: JSON.parse(raw),
    };
  } catch (error) {
    return {
      ok: false,
      status: null,
      error: error instanceof Error ? error.message : "Unknown remote build read error",
    };
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const webhookUrl = Deno.env.get("HOSTINGER_DEPLOY_WEBHOOK_URL");

    if (!webhookUrl) {
      return new Response(JSON.stringify({ error: "Missing Hostinger webhook secret." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid request payload", details: parsed.error.flatten() }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const requestId = crypto.randomUUID();
    const logs: Array<{ step: string; message: string; at: string }> = [];
    const pushLog = (step: string, message: string) => logs.push({ step, message, at: new Date().toISOString() });

    const domain = normalizeDomain(parsed.data.domain);
    pushLog("prepare", `Prepared webhook test for ${domain}.`);

    const payload = {
      ...parsed.data.payload,
      __testMeta: {
        requestId,
        source: "lovable-hostinger-deploy-tester",
        buildId: parsed.data.currentBuild.buildId,
        sentAt: new Date().toISOString(),
      },
    };

    pushLog("webhook", "Sending test payload to Hostinger webhook.");
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "lovable-hostinger-deploy-tester",
      },
      body: JSON.stringify(payload),
    });
    const webhookText = await webhookResponse.text();
    pushLog("webhook", `Webhook responded with HTTP ${webhookResponse.status} ${webhookResponse.statusText}.`);

    pushLog("verify", "Checking live DNS and build marker after webhook call.");
    const [aRecords, cnameRecords, remoteBuild] = await Promise.all([
      fetchDnsRecords(domain, "A"),
      fetchDnsRecords(domain, "CNAME"),
      readRemoteBuildInfo(domain),
    ]);

    const target = classifyEnvironment(aRecords, cnameRecords);
    const remoteData = remoteBuild.ok ? remoteBuild.data : null;
    const versionMatch = Boolean(remoteData?.buildId) && remoteData.buildId === parsed.data.currentBuild.buildId;

    pushLog(
      "verify",
      versionMatch
        ? "Live build marker matches the current build."
        : `Live build marker does not match yet${remoteBuild.status ? ` (HTTP ${remoteBuild.status})` : ""}.`,
    );

    return new Response(
      JSON.stringify({
        ok: webhookResponse.ok,
        requestId,
        domain,
        currentBuild: parsed.data.currentBuild,
        webhookStatus: webhookResponse.status,
        webhookOk: webhookResponse.ok,
        webhookStatusText: webhookResponse.statusText,
        webhookBodyPreview: webhookText.slice(0, 4000),
        submittedPayload: payload,
        logs,
        remoteCheck: {
          ok: remoteBuild.ok,
          remoteBuildStatus: remoteBuild.status,
          versionMatch,
          target,
          remoteBuild,
        },
      }),
      {
        status: webhookResponse.ok ? 200 : 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});