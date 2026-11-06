# General Development Instructions

## 1. Project Architecture

- Follow the existing project architecture and folder structure.
- Inspect existing implementations before introducing new patterns.
- Keep feature-specific code inside its respective feature directory.
- Follow established naming conventions and coding patterns.
- Avoid unnecessary architectural changes.

## 2. TypeScript and Code Quality

- Use TypeScript with proper type definitions.
- Avoid `any` when an appropriate type is available.
- Write clean, readable, and maintainable code.
- Keep functions and components focused on a single responsibility.
- Avoid unnecessary abstractions and premature optimization.
- Remove unused imports, variables, and dependencies.

## 3. Existing Code and Reusability

- Inspect existing components, hooks, utilities, and services before creating new ones.
- Reuse existing implementations whenever possible.
- Extend existing functionality when appropriate.
- Do not duplicate components, utilities, or business logic.
- Check existing usages before modifying shared code.

## 4. State Management

- Use Redux Toolkit for global application state according to existing project conventions.
- Use React `useState` for local component state.
- Avoid duplicating the same state in multiple places.
- Follow existing Redux slice, selector, and dispatch patterns.
- Do not introduce another state management library.

## 5. API Integration

- Follow the existing API service and Redux Toolkit architecture.
- Do not assume RTK Query is installed.
- Use existing API utilities and response types.
- Handle loading, success, and failure states.
- Do not invent API endpoints, request fields, or response structures.
- Keep sensitive information out of client-side environment variables and logs.

## 6. Error Handling

- Handle errors explicitly.
- Avoid silently ignoring failed operations.
- Provide meaningful user feedback through existing project components.
- Do not expose sensitive information or raw internal errors.
- Preserve user data when an operation fails whenever possible.

## 7. Security and Permissions

- Respect existing authentication and authorization mechanisms.
- Do not treat frontend visibility as authorization.
- Never expose secrets, tokens, or sensitive configuration.
- Validate user input appropriately.
- Follow existing security conventions.

## 8. Dependencies

- Prefer existing project dependencies.
- Inspect available utilities before installing new packages.
- Do not introduce unnecessary libraries.
- Explain the need for a new dependency when one is genuinely required.

## 9. Development Workflow

Before implementing a task:

1. Understand the requirement.
2. Inspect relevant existing code.
3. Identify affected files and dependencies.
4. Follow applicable Skills and Instructions.
5. Implement the smallest appropriate change.
6. Verify the implementation.

Ask for clarification when essential requirements or API details are missing. Do not invent business rules.

## 10. Code Changes

- Avoid unrelated refactoring.
- Preserve existing functionality.
- Keep changes focused and minimal.
- Follow existing formatting conventions.
- Do not overwrite existing implementations without understanding their purpose.

## 11. Verification and Reporting

- Run relevant lint, type-check, tests, or build commands when available.
- Fix issues introduced by the changes.
- Report which checks were actually executed.
- Mention unresolved issues and assumptions honestly.

**Core Principle:** Understand the existing project first, reuse established patterns, make minimal reliable changes, and prioritize maintainability and security.
