---
name: bug-fixing
description: Investigate and fix reproducible bugs in this Next.js admin panel with minimal, verified changes and no unrelated refactoring.
---

# Bug Fixing

## When to Use
Use this skill when diagnosing and correcting an error, regression, incorrect UI behavior, or unexpected application result.

## Workflow

1. Read `AGENTS.md` and relevant project documentation.
2. Reproduce the issue or inspect the exact error, logs, and affected code.
3. Trace the behavior through the relevant component, hook, Redux logic, API integration, and configuration.
4. Identify the root cause before changing code.
5. Check for related edge cases and possible regressions.
6. Apply the smallest safe fix.
7. Run focused verification, then broader checks when appropriate.

## Investigation Rules

- Do not guess the root cause from an error message alone.
- Inspect installed package versions and existing implementation before relying on examples from other versions.
- Distinguish frontend, backend, network, environment, and dependency issues.
- Check browser console and network behavior when relevant and available.
- Do not hide errors by adding broad try/catch blocks, disabling checks, or weakening security.
- Do not change unrelated files.
- Preserve existing user changes and Git modifications.
- Ask for missing reproduction steps or API behavior when they are necessary.

## Verification

- Confirm the original failure is addressed.
- Check the affected workflow and relevant edge cases.
- Run available type checks, linting, tests, or build commands as appropriate.
- Never claim a check passed unless it was executed.
- Report checks that could not be run.

## Completion Report

State the root cause, the fix, files changed, verification performed, and any remaining risk.
