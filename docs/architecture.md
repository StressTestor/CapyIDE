# CapyIDE Architecture

CapyIDE is built as a fork of VS Code with additional components to support persistent AI memory and offline-first design.

## Frontend
- **Next.js App Router**: Handles client-side routing and UI for the CapyIDE web interface.
- **Tailwind CSS** and **Radix UI**: Provide the UI framework and components.

## Backend
- **Node.js Express API**: Serves API requests from the frontend and proxies requests to Azure OpenAI and memory storage.
- **Memory Kit**: (future) Pluggable memory layer for persistent context. It will live in `memory-stack/` and provide context retrieval and storage.

## Infrastructure
- The application is deployed on **Vercel** for the frontend and **Azure Functions**/**App Service** for the backend.
- It uses **Azure Monitor**, **Log Analytics**, **Application Insights**, and **Defender for Cloud** for observability and security (see `azure-usage.md`).
- Continuous integration is provided by GitHub Actions in `.github/workflows/ci.yml`.

## Request/Response Flow
1. User interacts with the UI; Next.js sends API requests to `/api/...`.
2. The backend processes the request, interacts with memory and calls the Azure OpenAI service.
3. Responses are returned to the frontend, which updates the UI.

This document will evolve as components are added.
