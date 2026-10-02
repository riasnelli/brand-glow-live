# Fix Instagram feed failure

## Goal
Restore the Instagram portfolio feed and prevent a provider outage or expired token from leaving the works section blank.

## Changes
- Harden the Instagram backend function with request validation, current CORS handling, safe provider-error classification, response timeouts, and a short-lived cache.
- Return useful non-sensitive status details for expired/invalid permissions while keeping the access token private.
- Keep the page usable when Instagram is unavailable by showing the existing curated work imagery instead of an empty section.
- Deploy and call the function directly, then verify the homepage and current build status.

## Expected outcome
The live feed loads when the configured Instagram credential is valid. If Meta rejects the credential, the page still displays portfolio work and reports a clear credential issue for maintenance.
