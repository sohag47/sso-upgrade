# Testing Instructions

## 1. General Rules

- Follow the existing project testing framework and conventions.
- Inspect existing tests before creating new test files.
- Write tests for meaningful behavior and business requirements.
- Avoid unnecessary test dependencies.
- Do not modify application behavior only to make tests pass.

## 2. Component Testing

When testing components:

- Verify the component renders correctly.
- Test user interactions.
- Test loading, disabled, empty, and error states where applicable.
- Verify callback behavior.
- Verify conditional rendering.
- Test important edge cases.

## 3. Form Testing

When testing forms:

- Verify required field validation.
- Test invalid and valid inputs.
- Verify validation error messages.
- Test successful submission.
- Test failed API submission.
- Verify loading and duplicate-submission behavior.
- Test conditional fields and file validation when applicable.

## 4. Data Table Testing

When testing data tables:

- Verify column headers and cell values.
- Test custom cell rendering.
- Verify sorting and search behavior.
- Test client-side and server-side pagination as applicable.
- Verify loading and empty states.
- Test row actions and custom buttons.

## 5. API Testing

- Verify request methods, endpoints, and payloads.
- Test successful API responses.
- Test API errors and failure scenarios.
- Verify loading state transitions.
- Check that sensitive information is not exposed.

## 6. Verification

Before completing a task:

- Run relevant tests.
- Run the available lint command.
- Run TypeScript checks when available.
- Run the production build when appropriate.
- Review changed files for unrelated modifications.
- Report only checks that were actually executed.

## 7. Restrictions

- Do not claim tests passed without running them.
- Do not skip existing relevant tests.
- Do not use unnecessary mocks that hide actual behavior.
- Do not introduce testing dependencies without checking the existing setup.

**Core Principle:** Verify real application behavior and report test results accurately.
