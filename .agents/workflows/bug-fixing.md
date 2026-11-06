# Bug Fixing Workflow

## Purpose

Define a systematic process for identifying, investigating, fixing, and verifying bugs without introducing regressions.

## Workflow

### 1. Bug Understanding

- Understand the reported issue and expected behavior.
- Identify reproduction steps.
- Determine the affected functionality.
- Collect relevant error messages, logs, and screenshots when available.
- Ask for clarification if the issue cannot be understood or reproduced.

**Output:** Clear bug description and expected behavior.

### 2. Investigation

- Reproduce the issue before attempting a fix.
- Inspect relevant components, hooks, services, and API integrations.
- Check browser console and network errors when relevant.
- Trace the source of the problem.
- Inspect related existing implementations.
- Identify the root cause rather than treating symptoms.

**Output:** Identified root cause.

### 3. Fix Planning

- Determine the smallest appropriate fix.
- Identify affected files.
- Check potential side effects.
- Consider existing architecture and reusable utilities.
- Avoid unrelated refactoring.

**Output:** Focused fix plan.

### 4. Implementation

- Apply the fix based on the identified root cause.
- Follow existing project conventions.
- Reuse existing components and utilities.
- Handle relevant edge cases.
- Avoid unnecessary dependencies or architectural changes.

**Output:** Implemented bug fix.

### 5. Verification

- Reproduce the original scenario again.
- Verify the expected behavior.
- Check related functionality for regressions.
- Run relevant tests.
- Run TypeScript and ESLint checks when appropriate.
- Run production build when appropriate.

Never claim an issue is fixed without appropriate verification.

**Output:** Verification results.

### 6. Completion Report

Provide:

- Bug description.
- Root cause.
- Files modified.
- Fix implemented.
- Verification results.
- Remaining issues or limitations.

## General Rules

- Always investigate before modifying code.
- Fix root causes instead of hiding symptoms.
- Prefer minimal and maintainable changes.
- Do not modify unrelated functionality.
- Do not suppress errors simply to make them disappear.
- Do not invent API behavior.
- Follow relevant project instructions and specialized skills.

## Related Skills

- `bug-fixing`
- `api-integration`
- `code-review`

## Workflow Completion

A bug is considered fixed only when the root cause has been addressed and the relevant behavior has been verified.
