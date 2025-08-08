# CapyIDE  Founders Hub Summary

What it is: A VS Code-class IDE with persistent memory and an AI Control Plane (BYOK). Offline-first; security-hardened. Public site: https://capyide.dev

Why Azure fits: CapyIDE integrates with cloud AI providers optionally. We support Azure AI Foundry (GPT-5) as a first-class provider for reasoning-heavy coding, documentation, and eval workflows.

## Security posture (web):

- OWASP-aligned: strict CSP (nonce), HSTS on previews, COOP/COEP/CORP, Permissions-Policy
- Supply-chain: pinned deps, Dependabot, CodeQL, pnpm audit (fail on high/critical)
- Tests: Playwright checks headers & CSP; build artifact secret scan

## Planned Azure usage (credit-efficient):

- Short, controlled GPT-5 evaluation batch via Foundry to reach the engagement threshold
- Cost guardrails: Azure budget + alerts; revert to lower-cost models post-unlock

## Contacts:

- General: hello@capyide.dev
- Security: security@capyide.dev
- Repo: https://github.com/StressTestor/CapyIDE
