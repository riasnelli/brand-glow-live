import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, ExternalLink, Loader2, RefreshCw, Rocket, ServerCrash, TerminalSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CURRENT_BUILD_INFO } from "@/lib/build-info";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type DeployResponse = {
  ok: boolean;
  requestId: string;
  webhookStatus: number | null;
  webhookOk: boolean;
  webhookStatusText?: string;
  webhookBodyPreview?: string;
  domain: string;
  currentBuild: { version: string; buildId: string; label?: string };
  remoteCheck?: {
    ok: boolean;
    remoteBuildStatus: number | null;
    versionMatch: boolean;
    target?: { environment: string; reason: string };
    remoteBuild?: { ok: boolean; data?: { version?: string; buildId?: string; label?: string }; error?: string } | null;
  };
  submittedPayload: Record<string, unknown>;
  logs: Array<{ step: string; message: string; at: string }>;
  error?: string;
};

const DEFAULT_DOMAIN = "makeyourbrand.live";

const DeployTest = () => {
  const [domain, setDomain] = useState(DEFAULT_DOMAIN);
  const [payload, setPayload] = useState(() =>
    JSON.stringify(
      {
        ref: "refs/heads/main",
        repository: { name: "brand-glow-live", full_name: "riasnelli/brand-glow-live" },
        head_commit: {
          id: CURRENT_BUILD_INFO.buildId,
          message: "Manual deploy test from dashboard",
          timestamp: new Date().toISOString(),
        },
        pusher: { name: "Lovable" },
      },
      null,
      2,
    ),
  );
  const [result, setResult] = useState<DeployResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const parsedPayload = useMemo(() => {
    try {
      return JSON.parse(payload) as Record<string, unknown>;
    } catch {
      return null;
    }
  }, [payload]);

  const runDeployTest = async () => {
    if (!parsedPayload) {
      setError("Payload must be valid JSON.");
      setResult(null);
      return;
    }

    setSubmitting(true);
    setError(null);

    const { data, error } = await supabase.functions.invoke("hostinger-deploy-tester", {
      body: {
        domain,
        currentBuild: CURRENT_BUILD_INFO,
        payload: parsedPayload,
      },
    });

    if (error) {
      setResult(null);
      setError(error.message || "Unable to trigger the deployment webhook.");
      setSubmitting(false);
      return;
    }

    setResult(data as DeployResponse);
    setSubmitting(false);
  };

  const statusTone = result?.webhookOk ? "default" : "destructive";
  const remoteBuildId = result?.remoteCheck?.remoteBuild?.data?.buildId;

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <Badge variant="secondary" className="w-fit">Deploy tools</Badge>
            <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Webhook deploy test</h1>
            <p className="max-w-2xl text-muted-foreground">
              Send a test push payload to Hostinger and review trigger status, live build match, and the returned response in one place.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft />
              Back to site
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <Card className="border-border/50 bg-card/70 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-foreground">
                <Rocket className="h-5 w-5 text-primary" />
                Trigger Hostinger deploy
              </CardTitle>
              <CardDescription>
                Use a GitHub-style push payload to test whether the Hostinger webhook accepts and starts the deployment flow.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="deploy-domain" className="text-sm font-medium text-foreground">Live domain</label>
                <Input id="deploy-domain" value={domain} onChange={(event) => setDomain(event.target.value)} placeholder="makeyourbrand.live" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="deploy-payload" className="text-sm font-medium text-foreground">Test payload</label>
                  <Badge variant={parsedPayload ? "secondary" : "destructive"}>{parsedPayload ? "Valid JSON" : "Invalid JSON"}</Badge>
                </div>
                <Textarea
                  id="deploy-payload"
                  value={payload}
                  onChange={(event) => setPayload(event.target.value)}
                  className="min-h-[340px] font-mono text-sm"
                  spellCheck={false}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={runDeployTest} disabled={submitting}>
                  {submitting ? <Loader2 className="animate-spin" /> : <TerminalSquare />}
                  {submitting ? "Sending test…" : "Send test deploy"}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setPayload(JSON.stringify({
                    ref: "refs/heads/main",
                    repository: { name: "brand-glow-live", full_name: "riasnelli/brand-glow-live" },
                    head_commit: {
                      id: CURRENT_BUILD_INFO.buildId,
                      message: "Manual deploy test from dashboard",
                      timestamp: new Date().toISOString(),
                    },
                    pusher: { name: "Lovable" },
                  }, null, 2))}
                >
                  <RefreshCw />
                  Reset sample payload
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <ServerCrash className="h-4 w-4" />
                  <AlertTitle>Deploy trigger failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-border/50 bg-card/70 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-foreground">
                  {result?.webhookOk ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <TerminalSquare className="h-5 w-5 text-primary" />}
                  Deployment status
                </CardTitle>
                <CardDescription>
                  Immediate response from the webhook plus a follow-up live build check.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-border/40 bg-background/50 p-4">
                    <div className="mb-1 text-sm text-muted-foreground">Webhook response</div>
                    <div className="flex items-center gap-2">
                      <Badge variant={statusTone}>{result ? `HTTP ${result.webhookStatus ?? "—"}` : "Not run"}</Badge>
                      {result?.webhookStatusText && <span className="text-sm text-muted-foreground">{result.webhookStatusText}</span>}
                    </div>
                  </div>

                  <div className="rounded-lg border border-border/40 bg-background/50 p-4">
                    <div className="mb-1 text-sm text-muted-foreground">Current build</div>
                    <div className="break-all font-medium text-foreground">{CURRENT_BUILD_INFO.buildId}</div>
                    <div className="text-sm text-muted-foreground">{CURRENT_BUILD_INFO.version}</div>
                  </div>

                  <div className="rounded-lg border border-border/40 bg-background/50 p-4">
                    <div className="mb-1 text-sm text-muted-foreground">Live build</div>
                    <div className="break-all font-medium text-foreground">{remoteBuildId ?? "Unavailable"}</div>
                    <div className="text-sm text-muted-foreground">HTTP {result?.remoteCheck?.remoteBuildStatus ?? "—"}</div>
                  </div>

                  <div className="rounded-lg border border-border/40 bg-background/50 p-4">
                    <div className="mb-1 text-sm text-muted-foreground">Detected host</div>
                    <div className="font-medium text-foreground">{result?.remoteCheck?.target?.environment ?? "Not checked"}</div>
                    <div className="text-sm text-muted-foreground">{result?.remoteCheck?.target?.reason ?? "—"}</div>
                  </div>
                </div>

                {result && (
                  <Alert variant={result.remoteCheck?.versionMatch ? "default" : "destructive"}>
                    {result.remoteCheck?.versionMatch ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <ServerCrash className="h-4 w-4" />}
                    <AlertTitle>
                      {result.remoteCheck?.versionMatch ? "Live site matches this build" : "Live site has not switched to this build yet"}
                    </AlertTitle>
                    <AlertDescription>
                      {result.remoteCheck?.versionMatch
                        ? `${result.domain} is serving the current build marker after the webhook call.`
                        : "The webhook responded, but the live build marker still differs or could not be fetched yet. Check the response preview and Hostinger deploy output."}
                    </AlertDescription>
                  </Alert>
                )}

                {result?.webhookBodyPreview && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">Webhook response preview</div>
                    <pre className="overflow-x-auto rounded-lg border border-border/40 bg-background/60 p-4 text-sm text-muted-foreground">
                      {result.webhookBodyPreview}
                    </pre>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <a href={`https://${domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "")}/build-info.json`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
                    Open live build marker
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/70 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-foreground">Request log</CardTitle>
                <CardDescription>Step-by-step events from the backend test request.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result?.logs?.length ? (
                    result.logs.map((log, index) => (
                      <div key={`${log.at}-${index}`} className="rounded-lg border border-border/40 bg-background/50 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="font-medium text-foreground">{log.step}</div>
                          <div className="text-xs text-muted-foreground">{new Date(log.at).toLocaleString()}</div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">{log.message}</div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-lg border border-dashed border-border/50 bg-background/40 p-6 text-sm text-muted-foreground">
                      No logs yet. Send a test deploy to populate this panel.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeployTest;