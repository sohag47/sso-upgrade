---
name: form-development
description: Create and maintain forms using React Hook Form, Zod, HeroUI v2, and existing custom form components. Use when implementing, updating, or debugging forms.
---

# Form Development Skill

## Purpose

Build consistent, maintainable forms using the project's existing form architecture and reusable components.

## When to Use

- Creating a new form.
- Implementing Create/Edit forms.
- Adding or modifying form fields.
- Integrating form submission with APIs.
- Fixing form validation or input-related issues.

## Workflow

### 1. Inspect Existing Implementation

Before writing code:

- Inspect similar forms in the project.
- Find existing Input, Textarea, Autocomplete2, MultiSelect, DatePicker, and File input implementations.
- Check their props, validation handling, and usage patterns.
- Identify the existing custom Alert and Button components.
- Follow the existing folder structure and naming conventions.

Do not create duplicate components or introduce unnecessary dependencies.

### 2. Prepare Form Structure

- Create a separate `schema.ts` for Zod validation.
- Follow the project's global schema type declaration convention.
- Use `useForm` with `zodResolver`.
- Define appropriate `defaultValues`.
- Keep form values as strings where appropriate.

### 3. Implement Form Fields

- Use React Hook Form `Controller` for every form field.
- Use HeroUI v2 `Input` for standard inputs and file inputs following the provided examples.
- Use HeroUI v2 `Textarea` for multiline text.
- Use the existing `Autocomplete2` for dropdown/autocomplete fields.
- Use the existing `MultiSelect` for multiple selections.
- Use the existing custom `DatePicker` for date fields.
- Follow the component usage examples in `.agents/instructions/form-components.instructions.md`.

### 4. Implement Validation

- Add required, optional, and conditional validation as needed.
- Provide meaningful validation messages.
- Display field-level errors through the component's existing error props.
- Validate file type and size when file uploads are required.
- Avoid unnecessary type conversion during input.

### 5. Implement Submission

- Handle submission through React Hook Form's `handleSubmit`.
- Wrap asynchronous API operations in `try/catch`.
- Show loading indicators during requests.
- Prevent duplicate submissions.
- Show success or failure notifications using the project's custom Alert component.
- Preserve entered values when an API request fails.

### 6. Support Create and Edit

When appropriate, reuse the same form component for Create and Edit.

- Initialize the form with suitable default values.
- Populate existing data when editing.
- Use `reset` when loading or changing edit data.
- Keep Create/Edit differences explicit and maintainable.

### 7. Verify Implementation

- Check all form fields and their Controller bindings.
- Verify validation and error messages.
- Test Input, Textarea, MultiSelect, and Autocomplete2 interactions.
- Test DatePicker interactions.
- Verify file selection, file type, and file size validation when applicable.
- Test successful and failed API submissions.
- Check loading and duplicate-submission behavior.
- Run relevant lint, type-check, or build commands when available.

## Important Rules

- Follow `.agents/instructions/form.instructions.md`.
- Follow `.agents/instructions/form-components.instructions.md`.
- Inspect existing components before using or modifying them.
- Do not invent component props or API contracts.
- Do not introduce unnecessary abstractions.
- Prefer minimal, maintainable changes.

## Completion Report

After implementation, report:

1. Files created or modified.
2. Form fields and validation implemented.
3. API integration and submission behavior.
4. Verification performed.
5. Any remaining issues.
