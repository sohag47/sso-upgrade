---
name: code-review
description: Review code changes in this Next.js admin panel for correctness, regressions, security, maintainability, accessibility, and consistency with project conventions.
---

# Code Review

## When to Use
Use this skill when reviewing a pull request, a set of changed files, or an implementation before completion.

## Workflow

1. Read `AGENTS.md` and relevant project documentation.
2. Inspect the Git diff and surrounding code. Do not assume the diff tells the whole story.
3. Understand the intended behavior and identify affected workflows.
4. Check findings against actual code, installed dependencies, and verified requirements.
5. Report only actionable issues supported by evidence.
6. Run relevant checks when requested or useful and available.

## Review Priorities

1. **Correctness:** Does the change meet the requirement? Are edge cases handled?
2. **Regression risk:** Could existing workflows or shared components break?
3. **Security:** Are secrets, permissions, input validation, and sensitive data handled safely?
4. **Type safety:** Are types accurate? Are unsafe assertions or `any` introduced?
5. **API and state:** Are request contracts, Redux patterns, and loading/error states correct?
6. **Forms:** Are validation, payload conversion, server errors, and duplicate submissions handled?
7. **UI and accessibility:** Are responsive layouts, semantic controls, keyboard use, and feedback states preserved?
8. **Maintainability:** Is the solution focused, readable, and consistent with existing patterns?

## Reporting Rules

- Report findings first, ordered by severity.
- Include file and line references when available.
- Explain the impact and a concrete correction for each finding.
- Separate confirmed bugs from questions or suggestions.
- Do not report stylistic preferences as defects.
- Do not modify files unless the user explicitly asks for fixes.
- If no actionable issues are found, say so and mention the scope reviewed.
- Do not claim tests passed unless they were executed.

## Completion Report

Provide a concise review summary, findings with severity and evidence, checks performed, and remaining concerns.
