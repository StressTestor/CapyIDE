## Contributing to CapyIDE

Thank you for your interest in contributing! Please follow these guidelines to keep the project consistent and healthy.

### Project structure
- Core product lives in `CapyIDE/` (VS Code OSS fork and Electron app).
- Dev-only MCP tools are configured with `mcp_settings.json` and run from sibling repo `../capy-mcp`. Do not add MCP packages to `CapyIDE/package.json` and do not bundle MCP artifacts.

### Development environment
1) Node.js LTS, Git, Python + build tools for native modules.
2) Install dependencies in `CapyIDE/` with `npm ci`.
3) Build with `npm run compile` and run with `npm run electron` inside `CapyIDE/`.

### Coding standards
- TypeScript style: explicit types for public APIs, early returns, small functions, clear naming.
- Multi-line readability over dense one-liners; avoid unrelated reformatting in edits.
- Keep platform layers clean: avoid importing Node-only modules into browser layers.
- Add/update tests when changing core behaviors. Prefer unit tests in `CapyIDE/test/`.

### Security & privacy
- Local memory/metrics are opt-in and private by default; no unsolicited telemetry.
- Secrets live in OS keychain/DPAPI; never commit plaintext secrets.
- Packaging must include only `CapyIDE/` outputs and built-in extensions. Exclude `_refs` and any MCP artifacts.

### MCP tools (dev-only)
- Configured via `mcp_settings.json` with `${workspaceFolder}` paths to `../capy-mcp`.
- Validate with `node ./mcp_call_test.mjs` or `powershell -File ./mcp_smoketest.ps1`.
- Never add MCP packages to product manifests and never ship them.

### Commit style
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, etc.
- Keep changes focused; avoid sweeping refactors in feature PRs.

### Pull requests
- Ensure green build and tests locally before opening a PR.
- Describe rationale, design decisions, and test coverage.
- Link related issues. Include screenshots for UI changes.

### License
By contributing, you agree that your contributions are licensed under the MIT License.


