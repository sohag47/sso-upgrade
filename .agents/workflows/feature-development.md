# Feature Development Workflow

## Purpose

Define a consistent development process for implementing new features in the existing project. All agents must follow this workflow to ensure code consistency, maintainability, and correctness.

## Workflow

### 1. Requirement Analysis

- Understand the requested feature and expected behavior.
- Identify business requirements and acceptance criteria.
- Inspect existing related features and project architecture.
- Identify missing information or ambiguities.
- Do not make assumptions about business rules or API contracts.

**Output:** Clear understanding of the requirements.

### 2. Planning

- Identify affected pages, components, hooks, services, and API integrations.
- Determine which existing components and utilities can be reused.
- Identify relevant instructions and skills.
- Break implementation into small, logical steps.
- Identify potential risks and dependencies.

**Output:** A clear implementation plan with affected files.

### 3. Implementation

- Follow the approved implementation plan.
- Follow `AGENTS.md` and relevant instruction files.
- Use existing project architecture and conventions.
- Reuse existing components and utilities.
- Apply relevant specialized skills when necessary.
- Avoid unnecessary dependencies, abstractions, and unrelated refactoring.

**Output:** Completed feature implementation.

### 4. Review

- Check implementation against the original requirements.
- Verify code consistency and maintainability.
- Check error handling and edge cases.
- Identify duplicated code and unnecessary complexity.
- Check for potential regressions.

Use the `code-review` skill when appropriate.

**Output:** Reviewed implementation and identified issues.

### 5. Verification

Run the relevant project checks:

- TypeScript type checking.
- ESLint.
- Relevant tests.
- Production build when appropriate.

Fix issues introduced by the implementation and repeat verification.

Never claim a check passed if it was not executed successfully.

**Output:** Verification results.

### 6. Completion Report

Provide a concise report containing:

- Feature summary.
- Files created or modified.
- Main implementation details.
- Verification results.
- Remaining issues or limitations.

Do not claim completion if important requirements remain unfinished.

## General Rules

- Follow the existing project architecture.
- Inspect before implementing.
- Prefer simple, maintainable solutions.
- Do not invent API endpoints, fields, or business rules.
- Do not modify unrelated functionality.
- Follow specialized skills instead of duplicating their detailed rules.
- Ask for clarification when a critical requirement is unclear.

## Related Skills

Use these skills when relevant:

- `crud-development`
- `form-development`
- `data-table-development`
- `api-integration`
- `code-review`
- `bug-fixing`

## Workflow Completion

A feature is complete only when implementation, review, and relevant verification are finished and the completion report is provided.
