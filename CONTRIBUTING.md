# Contributing to CapyIDE

Thanks for helping improve CapyIDE.

## Dev setup
Node 20+, pnpm

```bash
cd site
pnpm i
pnpm dev
pnpm build
```

## Commit & PR
- Conventional Commits (feat:, fix:, chore:, refactor:, docs:, test:)
- Keep PRs focused; ≤ 800 diff lines when possible
- Required checks: lint, build, tests, audit, CodeQL

## Before opening a PR
```bash
pnpm build # passes
pnpm test  # Playwright green
node scripts/headers-test.mjs # strict headers + CSP nonces
node scripts/assets-scan.mjs  # 0 secrets
```
Update docs if you change behavior

## Security
Never commit secrets. Use .env.local.

Report vulnerabilities to security@capyide.dev (see SECURITY.md).

