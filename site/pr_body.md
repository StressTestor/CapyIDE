**Summary**
- Strict static CSP via 
ext.config.ts (no external origins; no inline allowed)
- Middleware keeps Referrer-Policy, X-CTO, COOP/COEP/CORP, HSTS (prod), Permissions-Policy
- Playwright e2e updated to flag only *executable* inline JS; all tests pass
- Header probe + headers-test confirm CSP and policies present in prod
- Asset scan: 0 secrets; audit: no high/critical

**Acceptance**
- CI green
- e2e green
- scans clean