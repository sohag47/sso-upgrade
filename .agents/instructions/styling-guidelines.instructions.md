# Styling Instructions

## 1. General Rules

- Follow the existing project styling conventions.
- Use Tailwind CSS for component styling.
- Prefer existing utility classes and design tokens.
- Keep styles consistent across the application.
- Avoid unnecessary custom CSS.

## 2. Colors and Theme

- Always use existing CSS variables and theme colors.
- Support existing light and dark themes.
- Do not introduce arbitrary colors when an existing theme variable is available.
- Avoid hardcoded background, foreground, border, and text colors.
- Follow existing semantic color conventions for primary, secondary, success, warning, and danger states.

## 3. Layout and Spacing

- Use consistent Tailwind spacing utilities.
- Follow existing page and component spacing patterns.
- Use Flexbox and Grid where appropriate.
- Avoid unnecessary fixed widths and heights.
- Ensure responsive layouts.

## 4. Responsive Design

- Follow mobile-first responsive styling.
- Use existing Tailwind breakpoints.
- Ensure tables, forms, dialogs, and navigation remain usable on smaller screens.
- Avoid horizontal overflow unless required by the component.

## 5. Dark Mode

- Ensure new components support the existing dark mode.
- Use existing dark theme variables or established `dark:` utility conventions.
- Verify text, borders, backgrounds, and interactive states in both themes.

## 6. Restrictions

- Do not introduce inline styles when Tailwind or existing CSS variables are sufficient.
- Do not use arbitrary colors unnecessarily.
- Do not duplicate existing CSS utilities.
- Do not use excessive custom classes.
- Do not modify global theme variables for a local component requirement.

**Core Principle:** Use existing theme variables and Tailwind conventions to maintain consistent styling across the application.
