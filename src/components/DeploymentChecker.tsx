import { useState } from 'react';
import { CheckCircle2, ExternalLink, Globe, RefreshCw, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { CURRENT_BUILD_INFO } from '@/lib/build-info';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type CheckResult = {
  domain: string;
  dns: { aRecords: string[]; cnameRecords: string[] };
  target: { environment: string; reason: string };
  remoteBuildStatus: number;
  remoteBuild: { ok: boolean; data?: { version?: string; buildId?: string; label?: string }; error?: string } | null;
  currentBuild: { version: string; buildId: string; label?: string };
  versionMatch: boolean;
};

const DOMAIN = 'makeyourbrand.live';

const DeploymentChecker = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runCheck = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.functions.invoke('deployment-checker', {
      body: {
        domain: DOMAIN,
        currentBuild: CURRENT_BUILD_INFO,
      },
    });

    if (error) {
      setResult(null);
      setError(error.message || 'Unable to run deployment check.');
      setLoading(false);
      return;
    }

    setResult(data as CheckResult);
    setLoading(false);
  };

  const remoteBuildId = result?.remoteBuild?.data?.buildId;

  return (
    <section className="py-16 bg-background border-t border-border/30">
      <div className="container mx-auto px-6">
        <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="flex items-center gap-3 text-foreground">
                <Globe className="w-5 h-5 text-primary" />
                Live deployment checker
              </CardTitle>
              <CardDescription>
                Verifies where <span className="text-foreground">{DOMAIN}</span> points and whether it serves the latest build.
              </CardDescription>
            </div>
            <Button variant="outline" onClick={runCheck} disabled={loading}>
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Checking…' : 'Run check'}
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border/40 bg-background/50 p-4">
                <div className="text-sm text-muted-foreground mb-1">Current build</div>
                <div className="text-foreground font-medium break-all">{CURRENT_BUILD_INFO.buildId}</div>
                <div className="text-sm text-muted-foreground">{CURRENT_BUILD_INFO.version}</div>
              </div>

              <div className="rounded-lg border border-border/40 bg-background/50 p-4">
                <div className="text-sm text-muted-foreground mb-1">Detected environment</div>
                <div className="text-foreground font-medium">{result?.target.environment ?? 'Not checked yet'}</div>
                <div className="text-sm text-muted-foreground">{result?.target.reason ?? '—'}</div>
              </div>

              <div className="rounded-lg border border-border/40 bg-background/50 p-4">
                <div className="text-sm text-muted-foreground mb-1">Remote build</div>
                <div className="text-foreground font-medium break-all">{remoteBuildId ?? 'Unavailable'}</div>
                <div className="text-sm text-muted-foreground">HTTP {result?.remoteBuildStatus ?? '—'}</div>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Check failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && (
              <>
                <Alert>
                  {result.versionMatch ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                  <AlertTitle>{result.versionMatch ? 'Latest build is live' : 'Live domain is behind current build'}</AlertTitle>
                  <AlertDescription>
                    {result.versionMatch
                      ? `${DOMAIN} is serving the same build id as this editor.`
                      : `${DOMAIN} points to ${result.target.environment} but is not serving build ${CURRENT_BUILD_INFO.buildId}.`}
                  </AlertDescription>
                </Alert>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-border/40 bg-background/50 p-4">
                    <div className="text-sm text-muted-foreground mb-2">A records</div>
                    <div className="space-y-1 text-sm text-foreground break-all">
                      {result.dns.aRecords.length ? result.dns.aRecords.map((record) => <div key={record}>{record}</div>) : <div className="text-muted-foreground">None</div>}
                    </div>
                  </div>

                  <div className="rounded-lg border border-border/40 bg-background/50 p-4">
                    <div className="text-sm text-muted-foreground mb-2">CNAME records</div>
                    <div className="space-y-1 text-sm text-foreground break-all">
                      {result.dns.cnameRecords.length ? result.dns.cnameRecords.map((record) => <div key={record}>{record}</div>) : <div className="text-muted-foreground">None</div>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <a href={`https://${DOMAIN}/build-info.json`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
                    Open remote build marker
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DeploymentChecker;