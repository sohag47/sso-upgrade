# Form Development Instructions

## 1. Technology Stack

- React Hook Form for form state management.
- Zod for validation.
- `@hookform/resolvers` for Zod integration.
- HeroUI v2 for input components.
- shadcn/ui + HeroUI v2 for custom Dropdown and DatePicker components.

## 2. Input Components

- All form input components must use HeroUI v2.
- Dropdown and DatePicker must use the existing custom implementations based on shadcn/ui and HeroUI v2.
- File inputs must follow the project's existing custom component conventions.
- Always inspect and reuse existing custom components before creating new ones.
- Do not introduce duplicate input components or alternative UI libraries.

## 3. React Hook Form

- Every form field must be wrapped with React Hook Form's `Controller`.
- This applies to Input, Textarea, Dropdown, DatePicker, FileUpload, Checkbox, and other form controls.
- Use `control`, `field.value`, `field.onChange`, `field.onBlur`, and `field.ref` appropriately.
- Avoid managing form field values separately with `useState`.

## 4. Validation

- Every form must have a separate validation file named `schema.ts`.
- Use Zod for all form validation.
- Use `zodResolver` with React Hook Form.
- Declare schema types globally using the project's established global type declaration convention.
- Do not import globally declared schema types where they are already available.
- Keep form values as strings where appropriate.
- Do not unnecessarily use `z.number()` for HTML form fields.
- Provide meaningful validation messages.

## 5. Loading and Error Handling

- Maintain proper loading, success, and error states.
- Prevent duplicate form submissions.
- Use `try/catch` for every asynchronous API call.
- Handle API errors without breaking the UI.
- Preserve form values when an API request fails.
- Display appropriate feedback for API failures.
- Do not leave loading states active after success or failure.
- Follow existing API integration patterns.

## 6. Alerts and User Feedback

- Always show a user-facing alert after API operations, whether successful or failed.
- Use the project's existing custom Alert component.
- Do not use `alert()`, `window.alert()`, or browser-native notifications.
- Display meaningful, user-friendly messages.
- Use appropriate success, error, and warning alert variants.
- Do not expose raw API errors or sensitive information to users.

## 7. Buttons and Icons

- Use existing project Button components.
- Use `@iconify/react` icons. import `import { Icon } from "@iconify/react";` like this;
- Use appropriate icons for actions such as Save, Update, Cancel, Delete, and Upload.
- Maintain consistent icon sizes and button styling.
- Show loading indicators during API operations.
- Disable buttons when necessary to prevent duplicate actions.
- Provide accessible labels or tooltips for icon-only buttons.

## 8. Form Design

- Follow existing form layouts and spacing conventions.
- Keep labels, inputs, and validation messages consistent.
- Use responsive layouts.
- Display field-level validation errors.
- Maintain consistent Create and Edit form behavior.
- Reuse existing components instead of duplicating functionality.

## 9. Verification Checklist

Before completing a form, verify:

- [ ] All fields use React Hook Form `Controller`.
- [ ] HeroUI v2 input components are used.
- [ ] Custom Dropdown and DatePicker are reused.
- [ ] `schema.ts` exists for validation.
- [ ] Schema types follow global declaration conventions.
- [ ] Loading and error states work correctly.
- [ ] Every API operation has proper `try/catch` handling.
- [ ] Success and failure alerts use the custom Alert component.
- [ ] Appropriate Lucide icons are used.
- [ ] No unnecessary duplicate components or dependencies exist.

**Core Principle:** Reuse existing custom components, follow the established form architecture, handle every API outcome safely, and provide clear feedback to users.
