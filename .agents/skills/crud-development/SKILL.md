---
name: crud-development
description: Build or modify a complete CRUD feature in this Next.js admin panel using the existing project architecture, UI components, Redux Toolkit patterns, and form conventions.
---

# CRUD Development

## When to Use

Use this skill when implementing or modifying a feature that creates, reads, updates, deletes, lists, filters, or views records.

## Workflow

1. Inspect `AGENTS.md` and the relevant documents in `docs/`.
2. Inspect a similar existing feature and follow its folder structure, naming, UI, API, and state patterns.
3. Confirm the required fields, permissions, API contract, validation rules, and expected user workflow. Ask when essential details are missing.
4. Identify the smallest set of files that need to change.
5. Use specialized skills when applicable:
   - Use `form-development` for form implementation and validation.
   - Use `data-table-development` for data tables, pagination, search, and sorting.
   - Follow the corresponding instructions files for component usage.
6. Add or update types, validation, API logic, and UI states as required.
7. Verify the implementation with available linting, type checks, tests, or build commands.

## Implementation Rules

- Keep feature-specific code inside its feature directory.
- Reuse existing table, pagination, dialog, form, input, button, and feedback components.
- Follow the API architecture already used by the project. Do not assume RTK Query is installed.
- Use React Hook Form and Zod when consistent with the existing form pattern.
- Keep form input values as strings where appropriate; transform values explicitly when building the API payload.
- Handle loading, empty, error, success, and disabled states.
- Confirm destructive actions when the existing UX pattern requires it.
- Respect authentication and authorization behavior; frontend visibility is not authorization.
- Do not invent endpoints, fields, permissions, or business rules.
- Avoid unrelated refactoring and unnecessary dependencies.

## Completion Report

Summarize the feature, important files changed, checks actually run, and any missing API details or unresolved assumptions.
