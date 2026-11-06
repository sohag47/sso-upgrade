# UI Development Instructions

## 1. General Rules

- Follow the existing project UI architecture and design conventions.
- Inspect similar pages before implementing a new UI.
- Reuse existing components whenever possible.
- Maintain consistent layouts, spacing, typography, and interactions.
- Prefer simple, clean, and maintainable UI implementations.
- Ensure responsive behavior across supported screen sizes.

## 2. UI Libraries

- Use HeroUI v2 and shadcn/ui according to existing project conventions.
- Use existing custom components when available.
- Do not introduce another UI library without an explicit requirement.
- Do not replace existing components with alternatives unnecessarily.

## 3. Layout

- Follow existing page layouts and shared layout components.
- Keep page structures consistent across modules.
- Use existing container, card, and layout components.
- Maintain consistent spacing between sections and elements.
- Avoid unnecessary nested containers.

## 4. User Experience

- Provide appropriate loading, empty, error, and success states.
- Disable actions when they cannot be performed.
- Provide clear labels and meaningful feedback.
- Use confirmation dialogs for destructive actions when required by existing conventions.
- Avoid unnecessary animations and visual effects.

## 5. Accessibility

- Use meaningful labels for interactive elements.
- Ensure keyboard accessibility.
- Provide appropriate accessible names for icon-only buttons.
- Maintain sufficient color contrast.
- Do not rely only on color to communicate status.

## 6. Restrictions

- Do not introduce unnecessary UI dependencies.
- Do not duplicate existing components.
- Do not create inconsistent page layouts.
- Do not use arbitrary colors when project theme variables exist.
- Do not make unrelated UI changes.

**Core Principle:** Follow the existing design system and prioritize consistency, usability, accessibility, and maintainability.
