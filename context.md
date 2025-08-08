## CapyIDE Project Context

### Overview
- **Product**: CapyIDE – a desktop IDE based on a VS Code OSS fork.
- **App entry**: Electron app bootstraps VS Code core.
  - Primary entry: `CapyIDE/src/main.ts`
  - Loads: `CapyIDE/src/vs/code/electron-main/main.ts` and `CapyIDE/src/vs/code/electron-main/app.ts`
- **Build & packaging**:
  - Gulp orchestrator: `CapyIDE/build/gulpfile.vscode.js`
  - Electron packaging helper: `CapyIDE/build/lib/electron.ts`
  - Product metadata/scripts: `CapyIDE/package.json`
- **Extensions**: Built-in under `CapyIDE/extensions/`.
- **Tests**: Lives under `CapyIDE/test/` with scripts under `CapyIDE/scripts/`.
- **MCP tools (dev-only)**: Configured via `mcp_settings.json`; servers run from sibling repo `../capy-mcp`. Not packaged or depended on by product.
- **Local data (opt-in)**: `capy-memory.db`, `capy-metrics.db` at repo root; kept private and local.

### Key Paths and Responsibilities
- **Electron/Desktop**
  - `CapyIDE/src/main.ts`: Boots Electron and wiring.
  - `CapyIDE/src/vs/code/electron-main/main.ts`: VS Code Electron main process entry.
  - `CapyIDE/src/vs/code/electron-main/app.ts`: App lifecycle wiring.
- **Build & Packaging**
  - `CapyIDE/build/gulpfile.vscode.js`: Build tasks and orchestration.
  - `CapyIDE/build/lib/electron.ts`: Packaging helpers for Electron.
- **Product & Scripts**
  - `CapyIDE/package.json`: Product config and scripts.
  - `CapyIDE/scripts/`: Utility scripts (CLI, perf, build helpers).
- **Extensions**
  - `CapyIDE/extensions/*`: Built-in language/theme/feature extensions.
- **Remote/Web**
  - `CapyIDE/remote/`: Remote bits and web packaging (where applicable).
- **Tests**
  - `CapyIDE/test/`: Unit, integration, smoke, and automation tests.
- **Memory Stack (native/local)**
  - `memory-stack/core/MemoryStack.ts`, `memory-stack/core/MemoryLayer.ts`
  - `memory-stack/encryption/AESEncryption.ts`
- **Dev-only MCP Configuration**
  - `mcp_settings.json`: Stdio sidecar server config; uses `${workspaceFolder}` for paths.
  - Sibling repo servers: `../capy-mcp` (not vendored, not packaged).
- **Reference-only**
  - `_refs/`: For reference material only; must not be included in builds.

### Security & Guardrails
- **Packaging**: Include only `CapyIDE/` product outputs and built-in extensions.
- **MCP**: Do not add MCP packages to `CapyIDE/package.json`; do not ship MCP artifacts.
- **Privacy**: Memory/metrics are local-only and opt-in; no unsolicited telemetry.
- **Secrets**: Use OS keychain/DPAPI for secret storage; avoid plaintext in repo.
- **Platform layering**: Do not import Node-only modules into browser layers; keep Electron boundaries clean.

### Quick Validation
- **Call MCP tools (dev-only)**:
  ```sh
  node ./mcp_call_test.mjs
  ```
- **Smoke-test server spawn (dev-only)**:
  ```powershell
  powershell -File ./mcp_smoketest.ps1
  ```

### High-level Structure (selected)
```text
CapyIDE/
  CapyIDE/
    build/
      gulpfile.vscode.js
      lib/
        electron.ts
    src/
      main.ts
      vs/code/electron-main/
        main.ts
        app.ts
    extensions/
      ... built-in extensions ...
    scripts/
      ... build/test utilities ...
    test/
      ... unit, integration, smoke ...
    package.json
  memory-stack/
    core/
      MemoryStack.ts
      MemoryLayer.ts
    encryption/
      AESEncryption.ts
  mcp_settings.json  (dev-only)
  capy-memory.db     (local, opt-in)
  capy-metrics.db    (local, opt-in)
  _refs/             (reference-only; never packaged)
```

### Mermaid: Architecture Overview
```mermaid
graph TD
  "User" --> "CapyIDE Electron App (CapyIDE/src/main.ts)";

  "CapyIDE Electron App (CapyIDE/src/main.ts)" --> "VS Code Electron Main (CapyIDE/src/vs/code/electron-main/main.ts)";
  "VS Code Electron Main (CapyIDE/src/vs/code/electron-main/main.ts)" --> "App Wiring (CapyIDE/src/vs/code/electron-main/app.ts)";

  "Gulp Build (CapyIDE/build/gulpfile.vscode.js)" --> "Build Artifacts";
  "Electron Packaging Helper (CapyIDE/build/lib/electron.ts)" --> "Distributables";
  "Build Artifacts" --> "Distributables";

  "Built-in Extensions (CapyIDE/extensions/*)" --> "CapyIDE Electron App (CapyIDE/src/main.ts)";

  "Memory Stack (memory-stack/*)" --> "CapyIDE Electron App (CapyIDE/src/main.ts)";
  "Local Memory DB (capy-memory.db)" --> "CapyIDE Electron App (CapyIDE/src/main.ts)";
  "Local Metrics DB (capy-metrics.db)" --> "CapyIDE Electron App (CapyIDE/src/main.ts)";

  "Dev-only MCP Config (mcp_settings.json)" --> "Local MCP Servers (../capy-mcp)";
  "Local MCP Servers (../capy-mcp)" --> "Developer Workflow (not packaged)";

  "Scripts (CapyIDE/scripts/*)" --> "Gulp Build (CapyIDE/build/gulpfile.vscode.js)";

  %% Guardrails
  classDef devOnly fill:#fff0f6,stroke:#d6336c,color:#000;
  classDef shipped fill:#e7f5ff,stroke:#1971c2,color:#000;

  class "Dev-only MCP Config (mcp_settings.json)" devOnly;
  class "Local MCP Servers (../capy-mcp)" devOnly;
  class "Developer Workflow (not packaged)" devOnly;
  class "CapyIDE Electron App (CapyIDE/src/main.ts)" shipped;
  class "VS Code Electron Main (CapyIDE/src/vs/code/electron-main/main.ts)" shipped;
  class "App Wiring (CapyIDE/src/vs/code/electron-main/app.ts)" shipped;
  class "Built-in Extensions (CapyIDE/extensions/*)" shipped;
  class "Gulp Build (CapyIDE/build/gulpfile.vscode.js)" shipped;
  class "Electron Packaging Helper (CapyIDE/build/lib/electron.ts)" shipped;
  class "Build Artifacts" shipped;
  class "Distributables" shipped;
```

### Notes
- All MCP-related pieces are strictly for local development workflows and must never be bundled into the production artifacts.
- The `_refs` directory is for reference only and must be excluded from builds and runtime paths.
- Follow existing TypeScript style: explicit types for public APIs, early returns, multi-line readability, and clear naming.



