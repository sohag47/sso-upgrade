---
name: data-table-development
description: Implement and maintain data tables using the project's existing ThroughoutTable component. Use when creating, modifying, or debugging data tables, reports, pagination, sorting, and table actions.
---

# Data Table Development Skill

## Purpose

Build consistent data tables using HeroUI v2 Table through the project's existing `ThroughoutTable` component.

## When to Use

- Creating a new data table.
- Implementing report tables.
- Adding table columns or custom cell rendering.
- Implementing client-side or server-side pagination.
- Adding search, sorting, or row actions.
- Fixing table-related issues.

## Workflow

### 1. Inspect Existing Implementation

Before writing code:

- Find the existing `ThroughoutTable` component.
- Inspect its props, pagination, sorting, and selection behavior.
- Review similar table implementations.
- Identify the existing `IColumn`, `ETable`, and pagination types.
- Check how existing pages fetch and manage table data.

Do not create a duplicate table component.

### 2. Identify Pagination Strategy

Determine whether the table uses client-side or server-side data handling.

**Client-side:**

- Use `ThroughoutTable`.
- Define `columns` using `IColumn[]`.
- Implement `useRenderCell` with `React.useCallback`.
- Pass the complete dataset through `fetchData`.
- Configure the required table props.

**Server-side:**

- Keep API fetching and pagination logic in the page component.
- Maintain pagination, search, sorting, and page state.
- Pass API response data and pagination information to `ThroughoutTable`.
- Connect table callbacks to the corresponding state updates.

### 3. Define Columns

- Define columns using the project's `IColumn` type.
- Use `uid` as the column identifier.
- Set a meaningful `name` for each column.
- Configure `sortable` according to the column's behavior.
- Follow existing column naming conventions.

### 4. Implement Cell Rendering

- Use `useRenderCell` with `React.useCallback`.
- Handle custom columns using a `switch` statement.
- Use the supplied `index` for serial-number columns.
- Access row values using the column key.
- Handle object values safely when rendering.

### 5. Configure ThroughoutTable

- Use the existing `ThroughoutTable` component.
- Pass columns, data, loading state, title, and selection mode.
- Configure pagination and callbacks when required.
- Add custom buttons through `CUSTOM_BUTTON`.
- Follow existing export and action-button conventions.

### 6. Verify Implementation

- Verify all columns and cell values.
- Test sorting when enabled.
- Test search behavior.
- Test pagination and rows-per-page changes.
- Verify loading and empty states.
- Test custom buttons and export actions.
- Verify server-side API requests when applicable.
- Run relevant lint and type-check commands.

## Important Rules

- Follow `.agents/instructions/data-table.instructions.md`.
- Reuse `ThroughoutTable`; do not create another table implementation.
- Follow existing project types and component props.
- Do not invent unsupported props.
- Avoid unnecessary abstractions and dependencies.
- Keep server-side API logic in the page component.

## Completion Report

After implementation, report:

1. Files created or modified.
2. Pagination strategy used.
3. Columns and custom rendering implemented.
4. Search, sorting, and pagination behavior.
5. Verification performed.
6. Any remaining issues.
