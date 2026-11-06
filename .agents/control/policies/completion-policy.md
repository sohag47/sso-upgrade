# Completion Policy

## Purpose

Define the conditions for reporting a development task as complete.

## Before completion

The agent must:

1. Re-read the active task's requirements and acceptance criteria.
2. Review the complete diff.
3. Confirm changed files are within task scope.
4. Run relevant, permitted verification commands.
5. Record the actual command and result for each check.
6. Identify incomplete requirements, known issues, and unverified behavior.
7. Prepare the required completion report.

## Verification rules

- Do not claim tests, lint, typecheck, build, or other checks passed unless they were actually executed and passed.
- If a check was not run, state that it was not run and why.
- If a check failed, report the failure accurately.
- Do not bypass or weaken tests merely to obtain a passing result.
- Do not install missing tools or dependencies without approval.
- Do not run restricted verification commands without approval.

## Required completion report

Include:

- Task ID and title
- Summary of implementation
- Files created, modified, or deleted
- Verification commands actually executed and their results
- Acceptance criteria status
- Known issues and incomplete requirements
- Required commit message (message only)
- Task-history archive path, if the task was completed and archived

## Task history

- Archive only completed tasks.
- Preserve the original `pending-task.md` content exactly in the task-history file.
- Never overwrite an existing history entry.
- Never delete or replace `pending-task.md` without explicit user permission.
- If the task is incomplete, do not archive it as completed.

## Final responsibility

The user owns final review, Git commit/push, deployment, release, and production decisions. The agent must not perform those actions unless explicitly authorized under the project's permission rules.
