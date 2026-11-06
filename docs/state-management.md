# State Management

## Core Rule
Use local React state for local UI concerns and Redux Toolkit for state that must be shared across features or managed centrally.

## Local State
Use `useState` or other suitable React primitives for:
- Dialog and dropdown visibility.
- Temporary selections.
- Local tabs and disclosure state.
- Small component-specific interactions.

Do not put every UI value in Redux.

## Redux Toolkit
Use the existing Redux Toolkit setup for:
- Shared application state.
- State consumed by multiple unrelated components or routes.
- Feature state that needs centralized coordination.
- API workflows when that is the established project pattern.

## API State
- Follow the API architecture already implemented in the repository.
- Keep endpoint paths, request construction, and response handling consistent.
- Do not assume RTK Query is installed or required.
- Avoid duplicating the same request logic across components.
- Handle loading, success, empty, and error states.
- Do not store secrets in Redux or browser-persisted state.

## Persistence
- Persist only state that genuinely needs to survive reloads.
- Do not persist transient UI state by default.
- Treat browser storage as untrusted and accessible to client-side scripts.
- Never persist passwords, private keys, or sensitive tokens in an unsafe location.

## Implementation
- Keep slices focused on a domain or feature.
- Use typed hooks and typed store configuration when present.
- Avoid unnecessary global state and deeply coupled slices.
- Follow existing patterns for async actions, selectors, and error handling.
