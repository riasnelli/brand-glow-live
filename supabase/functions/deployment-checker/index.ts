import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://esm.sh/zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const requestSchema = z.object({
  domain: z.string().min(3).max(255),
  currentBuild: z.object({
    version: z.string(),
    buildId: z.string(),
    label: z.string().optional(),
  }),
});

const normalizeDomain = (input: string) => input.replace(/^https?:\/\//, '').replace(/\/.*$/, '').trim().toLowerCase();

const fetchDnsRecords = async (domain: string, type: 'A' | 'CNAME') => {
  const response = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`);
  const data = await response.json();
  return Array.isArray(data.Answer)
    ? data.Answer.map((answer: { data?: string }) => answer.data).filter(Boolean)
    : [];
};

const classifyEnvironment = (aRecords: string[], cnameRecords: string[]) => {
  if (aRecords.includes('185.158.133.1')) {
    return {
      environment: 'Lovable published site',
      reason: 'DNS A record points to Lovable hosting.',
    };
  }

  if (cnameRecords.some((record) => record.includes('lovable.app'))) {
    return {
      environment: 'Lovable subdomain',
      reason: 'DNS CNAME points to a lovable.app host.',
    };
  }

  if (cnameRecords.some((record) => record.includes('hostinger'))) {
    return {
      environment: 'Hostinger',
      reason: 'DNS CNAME points to Hostinger infrastructure.',
    };
  }

  return {
    environment: 'Unknown / external host',
    reason: 'DNS does not match the known Lovable hosting target.',
  };
};

const readRemoteBuildInfo = async (domain: string) => {
  const response = await fetch(`https://${domain}/build-info.json`, {
    headers: { 'cache-control': 'no-cache' },
  });

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: `Could not read remote build marker (${response.status})`,
    };
  }

  const data = await response.json();
  return {
    ok: true,
    status: response.status,
    data,
  };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid request payload', details: parsed.error.flatten() }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const domain = normalizeDomain(parsed.data.domain);
    const [aRecords, cnameRecords, remoteBuild] = await Promise.all([
      fetchDnsRecords(domain, 'A'),
      fetchDnsRecords(domain, 'CNAME'),
      readRemoteBuildInfo(domain),
    ]);

    const environment = classifyEnvironment(aRecords, cnameRecords);
    const remote = remoteBuild.ok ? remoteBuild.data : null;
    const currentBuild = parsed.data.currentBuild;

    return new Response(JSON.stringify({
      domain,
      dns: {
        aRecords,
        cnameRecords,
      },
      target: environment,
      remoteBuildStatus: remoteBuild.status,
      remoteBuild,
      currentBuild,
      versionMatch: Boolean(remote?.buildId) && remote.buildId === currentBuild.buildId,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});