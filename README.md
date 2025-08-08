## CapyIDE

CapyIDE is a desktop IDE built on a VS Code OSS fork. It launches an Electron app that boots VS Code core, with a product focus on local-first features. Development-only MCP tools are available to streamline local workflows but are never shipped with the product.

### Overview
- **Product**: CapyIDE – VS Code OSS fork under `CapyIDE/` running via Electron
- **App entry**: `CapyIDE/src/main.ts` → `CapyIDE/src/vs/code/electron-main/*`
- **Build & packaging**: `CapyIDE/build/gulpfile.vscode.js`, `CapyIDE/build/lib/electron.ts`
- **Built-in extensions**: `CapyIDE/extensions/`
- **Tests**: `CapyIDE/test/`
- **Dev-only MCP tools**: configured by `mcp_settings.json` and executed from sibling repo `../capy-mcp`
- **Local data (opt-in)**: `capy-memory.db`, `capy-metrics.db` at repo root; private/local

### Repository layout (selected)
```
CapyIDE/
  build/                    # Gulp tasks and Electron helpers
  src/                      # Electron + VS Code main process
  extensions/               # Built-in extensions
  test/                     # Unit, integration, smoke tests
  package.json              # Product config & scripts
mcp_settings.json           # Dev-only MCP servers (not packaged)
capy-memory.db              # Local-only (opt-in)
capy-metrics.db             # Local-only (opt-in)
```

### Quick start (development)
1) Install Node.js LTS and a supported Python/Build toolchain for native deps.

2) Install dependencies inside `CapyIDE/`:
```bash
cd CapyIDE
npm ci
```

3) Build and launch the desktop app:
```bash
npm run compile
npm run electron
```

4) (Optional) Download built-in extensions and run tests:
```bash
npm run download-builtin-extensions
npm test
```

### Dev-only MCP tools
MCP servers are configured via `mcp_settings.json` and run as stdio sidecars from a sibling repository `../capy-mcp`. They are for local development only and are not bundled or depended on by the product.

- Validate MCP call path:
```bash
node ./mcp_call_test.mjs
```

- Smoke-test server spawn (Windows PowerShell):
```powershell
powershell -File ./mcp_smoketest.ps1
```

Guardrails for MCP:
- Do not add MCP packages to `CapyIDE/package.json`.
- Do not include any MCP artifacts in product packaging.
- Paths in `mcp_settings.json` use `${workspaceFolder}` and point to `../capy-mcp`.

### VS Code fork integration
We maintain a focused integration branch and helper scripts:
- Guide: `vscode_fork_manual_setup.md`
- Preflight and setup: `preflight_checks.ps1`, `setup_vscode_fork.ps1`, `vscode_fork_setup.ps1`

### Security, privacy, and platform boundaries
- Local memory/metrics are opt-in and private by default; no unsolicited telemetry.
- Secrets use the OS keychain/DPAPI. Avoid plaintext secrets in the repo.
- Keep Electron/Node-only modules out of browser layers.
- Packaging includes only `CapyIDE/` outputs and built-in extensions. Exclude dev-only and reference folders (e.g., `_refs`).

### Contributing
See `.github/CONTRIBUTING.md` for development standards (TypeScript style, tests, guardrails) and workflow.

### License
This project is licensed under the MIT License. Portions are derived from VS Code OSS (MIT).


