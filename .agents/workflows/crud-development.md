# CRUD Development Workflow

## Purpose

Define a consistent process for implementing Create, Read, Update, and Delete (CRUD) features using the existing project architecture and reusable components.

## Workflow

### 1. Requirement Analysis

- Understand the CRUD requirements and expected behavior.
- Identify required fields, validation rules, and business logic.
- Determine whether the feature needs listing, searching, filtering, pagination, create, edit, and delete operations.
- Identify existing similar features.
- Never invent API endpoints, request payloads, or response structures.

**Output:** Clear CRUD requirements.

### 2. Existing Code Inspection

Before implementation:

- Inspect similar existing CRUD modules.
- Identify reusable components and hooks.
- Inspect Redux Toolkit API integration patterns.
- Understand existing routing and page structure.
- Check existing form and table conventions.

**Output:** Identified implementation patterns and reusable resources.

### 3. Implementation Planning

Determine:

- Page and component structure.
- API endpoints and required operations.
- Form fields and validation requirements.
- Table columns and rendering requirements.
- Search, filtering, and pagination behavior.
- Loading, empty, success, and error states.

**Output:** Implementation plan.

### 4. Implementation

Use the following specialized skills as needed:

**API Integration**

- Implement required API communication.
- Follow existing Redux Toolkit patterns.
- Handle loading and error states.
- Follow existing response and error-handling conventions.

**Data Table Development**

- Use the existing `ThroughoutTable` component.
- Follow existing `IColumn`, `useRenderCell`, `ETable`, and pagination conventions.
- Implement required actions, searching, and filtering.
- Do not introduce another table library.

**Form Development**

- Use React Hook Form and Zod.
- Use existing HeroUI v2 form components.
- Reuse `Autocomplete2`, `MultiSelect`, and `DatePicker` where appropriate.
- Use `Controller` for controlled form components.
- Keep validation schemas in separate `schema.ts` files.

**CRUD Integration**

- Connect listing, create, edit, and delete operations.
- Reuse existing components and utilities.
- Implement appropriate confirmation and notification behavior.
- Keep implementation consistent with existing modules.

### 5. Review

- Verify all requested CRUD operations.
- Check form validation and API integration.
- Verify table rendering and pagination.
- Check loading, empty, and error states.
- Check for duplicated logic and unnecessary components.
- Ensure existing functionality is not broken.

Use the `code-review` skill when appropriate.

### 6. Verification

Run relevant checks:

- TypeScript type checking.
- ESLint.
- Relevant tests.
- Production build when appropriate.

Fix implementation-related issues and repeat verification.

### 7. Completion Report

Provide:

- Implemented CRUD operations.
- Files created or modified.
- API integrations.
- Reusable components used.
- Verification results.
- Remaining issues or limitations.

## General Rules

- Follow the existing project architecture.
- Inspect similar modules before implementation.
- Prefer existing reusable components.
- Do not introduce unnecessary dependencies.
- Do not duplicate specialized skill instructions.
- Do not modify unrelated functionality.
- Never invent backend contracts or business rules.

## Related Skills

- `crud-development`
- `form-development`
- `data-table-development`
- `api-integration`
- `code-review`

## Workflow Completion

CRUD development is complete when all requested operations are implemented, reviewed, and verified.
