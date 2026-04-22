export const CURRENT_BUILD_INFO = {
  version: '2026.04.22',
  buildId: 'deploy-checker-2026-04-22-01',
  label: 'Deployment Checker Release',
} as const;

export type BuildInfo = typeof CURRENT_BUILD_INFO;