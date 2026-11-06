# Code Review Workflow

## Purpose

Define a consistent review process to evaluate code correctness, maintainability, architecture consistency, and potential regressions.

## Workflow

### 1. Review Scope

- Understand the purpose of the changes.
- Identify the original requirements.
- Inspect modified and newly created files.
- Understand the affected functionality.
- Review relevant existing implementations.

**Output:** Clear review scope.

### 2. Correctness Review

Check:

- Does the implementation satisfy the requirements?
- Is the business logic correct?
- Are edge cases handled?
- Is error handling appropriate?
- Are API requests and responses handled correctly?
- Are loading, empty, and error states handled?

**Output:** Correctness findings.

### 3. Architecture and Consistency Review

Check:

- Does the code follow the existing project architecture?
- Are existing reusable components used appropriately?
- Are established Redux Toolkit patterns followed?
- Are forms and tables implemented using existing conventions?
- Are responsibilities separated appropriately?
- Are unnecessary abstractions or dependencies introduced?

**Output:** Architecture findings.

### 4. Code Quality Review

Check:

- TypeScript type safety.
- Naming conventions.
- Readability and maintainability.
- Duplicated logic.
- Unnecessary complexity.
- Unused imports and variables.
- React component structure.
- Potential performance problems.
- Accessibility where relevant.

**Output:** Code quality findings.

### 5. Regression and Security Review

Check:

- Could the changes break existing functionality?
- Are sensitive values exposed?
- Is user input handled safely?
- Are authorization-related assumptions correct?
- Are error messages and logs appropriate?
- Are existing authentication conventions preserved?

**Output:** Regression and security findings.

### 6. Verification Review

Inspect available verification results:

- TypeScript checks.
- ESLint.
- Relevant tests.
- Production build.

Run relevant checks when needed and possible.

Distinguish executed checks from checks that were not performed.

**Output:** Verification findings.

### 7. Review Report

Present findings in priority order:

- Critical: Must be fixed immediately.
- High: Important correctness, security, or regression issues.
- Medium: Maintainability or functional improvements.
- Low: Minor consistency or readability improvements.

For each finding, provide:

- File and relevant location.
- Description of the problem.
- Why it matters.
- Recommended correction.

If no issues are found, explicitly state that no actionable issues were identified within the reviewed scope.

## General Rules

- Review actual code, not assumptions.
- Prioritize correctness and user impact.
- Report actionable issues only.
- Do not invent problems.
- Avoid subjective formatting preferences unless they violate project conventions.
- Do not modify code during a review-only task unless explicitly requested.
- Never claim complete verification without executing the relevant checks.

## Related Skills

- `code-review`
- `bug-fixing`
- `crud-development`
- `api-integration`

## Workflow Completion

A review is complete when the relevant scope has been inspected, findings are documented, and verification limitations are clearly communicated.
