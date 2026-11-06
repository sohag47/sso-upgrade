# UI Guidelines

## Design Principles
- Keep the interface consistent, clear, responsive, and accessible.
- Prefer existing shadcn/ui components and project design tokens.
- Avoid unnecessary visual complexity.
- Prioritize usability for frequent administrative workflows.

## Components
- Reuse shared components when behavior and presentation are genuinely common.
- Keep feature-specific UI inside its feature.
- Extend existing components carefully rather than creating near-duplicates.
- Keep component APIs small and understandable.

## Layout and Responsiveness
- Support the viewport sizes relevant to the application.
- Prevent horizontal overflow in pages, forms, and data tables.
- Keep navigation and page structure consistent.
- Use responsive layouts rather than fixed dimensions where practical.

## Interaction States
Provide appropriate states for:
- Loading
- Empty results
- Validation errors
- API errors
- Disabled actions
- Successful completion
- Destructive action confirmation

## Accessibility
- Use semantic HTML.
- Provide accessible labels for controls.
- Support keyboard navigation.
- Preserve visible focus indicators.
- Do not communicate status through color alone.
- Use appropriate dialog and menu semantics.

## Styling
- Use Tailwind utilities and existing CSS variables/tokens.
- Follow established spacing, typography, and color conventions.
- Avoid arbitrary values when a project token or existing utility is suitable.
