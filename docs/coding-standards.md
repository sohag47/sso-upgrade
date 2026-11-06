# Coding Standards

## General
- Prefer simple, readable, maintainable solutions.
- Follow the existing project conventions.
- Keep changes focused on the requested task.
- Avoid duplicated logic, unnecessary abstractions, and over-engineering.
- Do not add comments that merely restate obvious code.

## TypeScript
- Keep strict type checking enabled.
- Avoid `any`; use precise types or `unknown` with narrowing.
- Avoid unsafe type assertions.
- Model API and domain data with explicit types.
- Handle nullable and optional values deliberately.
- Do not suppress TypeScript errors without a documented reason.

## React and Next.js
- Use App Router conventions already present in the project.
- Prefer Server Components unless client-side behavior is needed.
- Keep components focused on a clear responsibility.
- Keep state as close as possible to where it is used.
- Use stable keys when rendering lists.
- Avoid unnecessary effects and derived state.
- Follow framework conventions for navigation, metadata, loading, and errors.

## Naming and Files
- Use descriptive names that match nearby files.
- Follow existing casing and export conventions.
- Keep feature-specific files within their feature.
- Avoid creating a file for a trivial one-use abstraction unless it improves clarity.

## Styling
- Use Tailwind CSS and existing design tokens.
- Reuse existing UI components.
- Maintain responsive behavior and accessibility.
- Avoid introducing a second styling system without approval.

## Dependencies
- Check whether the project already has a suitable dependency.
- Do not add, remove, or upgrade packages without a clear need.
- Prefer official package APIs and installed-version documentation.
