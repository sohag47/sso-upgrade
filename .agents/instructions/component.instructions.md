# Component Development Instructions

## 1. Before Creating Components

- Search for existing reusable components before creating a new one.
- Inspect component implementation, props, and usage examples.
- Check whether an existing component can be extended to support the requirement.
- Follow the existing component folder structure and naming conventions.

## 2. Component Reusability

- Build reusable components only when they provide meaningful reuse.
- Keep components focused on a single responsibility.
- Use clear and descriptive component and prop names.
- Avoid unnecessary abstractions and deeply nested component structures.
- Keep business logic separate from presentation when appropriate.

## 3. Props and Types

- Define proper TypeScript interfaces or types for component props.
- Avoid `any` when a proper type can be used.
- Use optional props only when they are genuinely optional.
- Provide sensible defaults where appropriate.
- Follow existing project type conventions.

## 4. Existing Component Usage

- Reuse existing Button, Alert, Dialog, Modal, Input, Dropdown, DatePicker, MultiSelect, and other shared components.
- Use `ThroughoutTable` for project data tables.
- Follow the dedicated form and data-table instructions for their usage.
- Do not directly replace existing custom components with library components without a clear requirement.

## 5. Component State

- Keep local UI state inside the component when appropriate.
- Use Redux Toolkit for state that belongs to the global application architecture.
- Avoid duplicating state unnecessarily.
- Keep component behavior predictable.

## 6. Performance

- Avoid unnecessary re-renders.
- Use `React.memo`, `useMemo`, and `useCallback` only when beneficial.
- Avoid premature optimization.
- Keep rendering logic straightforward.

## 7. Restrictions

- Do not create duplicate shared components.
- Do not add unnecessary dependencies.
- Do not expose internal implementation details through unnecessary props.
- Do not modify shared components in ways that break existing consumers.
- Verify existing usages before changing shared component APIs.

**Core Principle:** Reuse first, extend when necessary, and create new components only when justified.
