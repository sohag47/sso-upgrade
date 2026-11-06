# API Integration Workflow

## Purpose

Define a consistent process for integrating backend APIs into the existing frontend architecture.

## Workflow

### 1. API Requirement Analysis

- Understand the required API functionality.
- Identify required HTTP methods and operations.
- Inspect available API documentation or backend implementation.
- Identify request parameters, payloads, and response structures.
- Understand authentication and authorization requirements.
- Identify loading, success, and error-handling requirements.

Never invent API endpoints, request fields, or response structures.

**Output:** Verified API requirements.

### 2. Existing Integration Inspection

- Inspect existing Redux Toolkit API integration patterns.
- Review similar API integrations.
- Identify existing API base configuration.
- Check authentication and token-handling conventions.
- Inspect existing response and error-handling utilities.
- Identify reusable types and interfaces.

**Output:** Identified integration conventions.

### 3. Integration Planning

Determine:

- API endpoint and HTTP method.
- Request and response TypeScript types.
- Required query parameters and payload.
- Redux Toolkit integration location.
- Loading and error states.
- Cache invalidation or refetching requirements, if applicable.
- Components that will consume the API.

**Output:** API integration plan.

### 4. Implementation

- Follow the existing Redux Toolkit architecture.
- Reuse existing API configuration and utilities.
- Define appropriate TypeScript types.
- Implement the required API operation.
- Handle loading, success, and error states.
- Follow existing authentication conventions.
- Integrate the API with the relevant components or pages.
- Avoid unnecessary dependencies and duplicate API logic.

**Output:** Integrated API functionality.

### 5. Review

- Verify endpoint and HTTP method.
- Check request payload and query parameters.
- Verify response handling.
- Check error and loading states.
- Review authentication behavior.
- Check for duplicated logic.
- Ensure existing API integrations remain unaffected.

Use the `code-review` skill when appropriate.

**Output:** Reviewed API integration.

### 6. Verification

- Test successful API responses.
- Test relevant error responses.
- Verify loading states.
- Verify empty responses when applicable.
- Run relevant tests.
- Run TypeScript and ESLint checks.
- Run production build when appropriate.

Never claim an API was successfully tested without actual verification.

**Output:** Verification results.

### 7. Completion Report

Provide:

- Integrated API operations.
- Endpoints and HTTP methods.
- Files created or modified.
- Request and response handling.
- Verification results.
- Remaining issues or limitations.

## General Rules

- Follow existing Redux Toolkit patterns.
- Never invent backend contracts.
- Prefer existing shared utilities.
-
