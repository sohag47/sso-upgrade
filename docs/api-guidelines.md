# API Guidelines

## Source of Truth
The backend is an external REST API. Use verified API documentation, existing typed contracts, or confirmed examples. Never invent endpoint paths, methods, payload fields, response shapes, or business behavior.

## API Integration
- Follow the repository's existing Redux Toolkit-based API pattern.
- Keep API calls out of presentational components.
- Centralize shared base URL and request configuration.
- Use environment variables for environment-specific base URLs.
- Do not expose private server-side configuration through `NEXT_PUBLIC_` variables.
- Do not introduce RTK Query unless the project explicitly adopts it.

## Requests
- Use the correct HTTP method and content type.
- Send only required fields.
- Handle query parameters and URL encoding safely.
- Apply authentication headers or cookies according to the verified backend contract.
- Avoid logging credentials, tokens, or sensitive payloads.

## Responses and Errors
- Type request and response data.
- Do not assume every successful response has the same shape.
- Handle network failures, non-success HTTP statuses, and invalid response data.
- Show useful user-facing messages without exposing internal details.
- Keep backend error details available for safe diagnostics where appropriate.

## Security
- Treat all API data as untrusted input.
- Enforce authorization on the backend; hiding frontend controls is not authorization.
- Never hardcode credentials or secrets.
- Do not place secrets in client-side bundles or browser storage.
- Avoid leaking personal or sensitive data in logs.

## Verification
Before integrating an endpoint, verify its URL, method, headers, request schema, response schema, and error behavior from a reliable project or backend source.
