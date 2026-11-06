# Security Guidelines

## Secrets and Configuration
- Never hardcode passwords, API secrets, private keys, or credentials.
- Keep secrets in appropriate server-side environment configuration.
- Never expose secrets through `NEXT_PUBLIC_` variables.
- Do not commit `.env` files containing secrets.
- Do not print tokens or credentials in logs, screenshots, or final reports.

## Authentication and Authorization
- Follow the verified authentication design used by the project and backend.
- Do not invent token storage or refresh behavior.
- Treat frontend route protection as a usability layer, not the security boundary.
- Backend services must enforce authorization for protected operations.
- Do not bypass permission checks to make a UI action work.

## Data Handling
- Treat user input and API responses as untrusted.
- Validate data at appropriate boundaries.
- Avoid rendering untrusted HTML.
- Do not expose sensitive data in URLs, logs, client state, or error messages.
- Request and retain only data needed for the feature.

## Dependencies
- Prefer established, maintained packages.
- Review package purpose and trustworthiness before adding it.
- Avoid unnecessary dependencies and unsafe code execution patterns.

## Changes
- Do not weaken security settings to bypass errors.
- Do not change authentication, authorization, CORS, CSP, or cookie settings without understanding the impact.
- Report security-relevant assumptions and unresolved risks.
