---
name: api-integration
description: Integrate or update an external REST API in this Next.js application using the repository's established Redux Toolkit-based API architecture.
---

# API Integration

## When to Use
Use this skill when connecting a page or feature to an external REST API, adding an endpoint, or changing request and response handling.

## Workflow

1. Read `AGENTS.md`, `docs/api-guidelines.md`, and `docs/state-management.md`.
2. Inspect the existing API setup, base query or request utilities, Redux slices, types, and a similar integration.
3. Verify the endpoint contract: URL, method, headers, authentication, query parameters, request body, response shape, and error behavior.
4. Confirm missing or ambiguous contract details before implementation.
5. Add or update typed request and response models.
6. Implement the request using the established project pattern.
7. Connect the API state to the UI and handle loading, success, empty, and error states.
8. Verify with available tests, type checks, linting, or build commands.

## Rules

- Treat the backend as external; do not assume access to its source code.
- Never invent endpoint paths, HTTP methods, payload fields, response properties, or status meanings.
- Follow the existing Redux Toolkit API pattern.
- Do not introduce RTK Query unless the project explicitly uses or adopts it.
- Keep request logic out of presentational components.
- Use the configured base URL and environment variables.
- Never expose private secrets through client-side environment variables.
- Type API data and handle nullable or optional fields deliberately.
- Treat API responses as untrusted input.
- Avoid logging tokens, credentials, or sensitive personal data.
- Do not change authentication or authorization behavior without verified requirements.

## Completion Report

List the endpoint integrated, contract source used, files changed, UI states handled, checks performed, and any contract details that remain unconfirmed.
