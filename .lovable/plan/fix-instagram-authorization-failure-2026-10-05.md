# Fix Instagram authorization failure

## Outcome
The Selected Work section remains visible and the page no longer reports a runtime failure when Instagram authorization expires. Live Instagram posts resume after a fresh Meta token is saved.

## Changes
- Treat an expired or rejected Instagram token as a degraded feed response instead of an unhandled page-level 503.
- Preserve the bundled five-project portfolio as the immediate fallback.
- Keep server diagnostics clear without exposing token details.
- Securely replace `INSTAGRAM_ACCESS_TOKEN` with a fresh long-lived token supplied through the protected secrets form.
- Deploy and test the Instagram feed function, then verify the homepage stays populated.

## Technical details
- Return a successful structured response with an empty `media` array and a warning code for Meta authorization failures; the browser will retain its bundled fallback items.
- Continue returning genuine error statuses for malformed requests and unexpected server failures.
- No token will be placed in source code, logs, or chat.
