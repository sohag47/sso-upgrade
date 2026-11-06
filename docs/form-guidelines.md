# Form Guidelines

## Standard
Use React Hook Form for form state and Zod for schema validation, following installed versions and existing project patterns.

## Input Values
- Keep form input values as strings unless there is a clear reason otherwise.
- Convert values to the required API/domain type at the submission boundary.
- Validate numeric-looking strings with suitable string validation before conversion.
- Do not use numeric schema types for ordinary text-input values merely because the submitted API field is numeric.

## Validation
- Define reusable schemas when validation rules are genuinely shared.
- Provide clear, field-specific error messages.
- Validate required, length, format, and cross-field constraints as applicable.
- Keep frontend validation aligned with confirmed backend rules.
- Remember that frontend validation does not replace backend validation.

## UX and Accessibility
- Associate labels with controls.
- Show errors near the relevant fields.
- Preserve entered values when safe and appropriate.
- Prevent accidental duplicate submissions.
- Provide submitting, success, and failure feedback.
- Ensure keyboard accessibility and visible focus states.

## Submission
- Validate before submitting.
- Transform form values into the API payload explicitly.
- Handle server-side validation errors.
- Do not report success until the request succeeds.
- Reset the form only when appropriate for the workflow.

## Consistency
Reuse existing form controls and patterns. Avoid creating a new form abstraction for a single simple form without a clear benefit.
