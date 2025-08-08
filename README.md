# CapyIDE

A developer IDE with **persistent memory** and an **AI Control Plane** that routes to mainstream models via BYOK. Offline-first, security-hardened, and priced so indies can actually use it.

- **Positioning:** Only IDE with persistent memory + unlimited mainstream AI for **$15** (Pro).
- **Status:** Active pre-release; public site at **https://capyide.dev**.
- **Security:** OWASP-aligned site hardening (CSP nonces, strict headers, supply-chain hygiene).

## Features
- MemoryKit: multi-layer persistent context for projects
- AI Control Plane (ACP): BYOK routing to OpenAI/Claude/DeepSeek/Llama/etc.
- Offline-first, local-friendly workflows
- Optional integration with **Azure AI Foundry (GPT-5)** for reasoning-heavy tasks
- Clean pricing: Free / Pro ($15) / Enterprise

## Quickstart (website)
```bash
cd site
pnpm i
pnpm dev
# build check
pnpm build
```

## Security posture (site)
- Strict CSP with per-request nonces; no unsafe-inline
- HSTS (non-.dev previews), .dev is HSTS-preloaded
- Permissions-Policy locked down; COOP/COEP/CORP set
- Supply-chain hygiene (pinned deps, Dependabot, CodeQL, audits)
- No secrets in repo; .env.local only with .env.example template

## Tests
```bash
pnpm test                    # Playwright e2e (headers/CSP)
node scripts/headers-test.mjs
node scripts/assets-scan.mjs # scan .next/static for secrets
pnpm audit --audit-level=high
```

## Links
- Website: https://capyide.dev
- Repo: https://github.com/StressTestor/CapyIDE
- Security contact: security@capyide.dev

## License
MIT — see LICENSE.
