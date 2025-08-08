## Security Policy

### Supported Versions
CapyIDE is under active development. Security updates will be applied to the default branch and included in releases.

### Reporting a Vulnerability
Please report security issues privately to the maintainers. Do not create public GitHub issues for security reports.

### Security Posture
- Local-first: memory/metrics are opt-in and stored locally.
- Secrets: use OS keychain/DPAPI; never store plaintext secrets in the repo.
- Packaging excludes dev-only MCP artifacts and `_refs`.
- Maintain platform boundaries (avoid Node-only modules in web/browser layers).


