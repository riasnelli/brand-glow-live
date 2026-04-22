export const CURRENT_BUILD_INFO = {
  version: import.meta.env.VITE_APP_VERSION ?? 'dev',
  buildId: import.meta.env.VITE_APP_BUILD_ID ?? 'dev-build',
  label: 'Deployment Checker Release',
} as const;

export type BuildInfo = typeof CURRENT_BUILD_INFO;