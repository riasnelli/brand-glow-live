export interface InstagramProviderError {
  status: number;
  code?: number;
  subcode?: number;
  type?: string;
}

export function isInstagramAuthorizationError(error: InstagramProviderError): boolean {
  return error.status === 401 || error.status === 403 || error.code === 190;
}

export function instagramAuthorizationFallback() {
  return {
    media: [],
    warning: "Instagram authorization needs to be renewed.",
    code: "TOKEN_INVALID",
  } as const;
}