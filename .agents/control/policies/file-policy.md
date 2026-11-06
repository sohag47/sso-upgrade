# File Policy

## Purpose

Protect project files and keep changes relevant, reviewable, and reversible.

## Before reading or editing

- Read the active root `pending-task.md` before development work.
- Inspect the target file and relevant neighboring implementation.
- Follow existing project architecture and conventions.
- Load only the instructions, skills, workflows, and documentation relevant to the task.

## Change scope

- Modify only files necessary to satisfy the active task.
- Prefer the smallest maintainable change.
- Reuse existing components, utilities, and patterns.
- Do not create duplicate abstractions or unrelated refactors.
- Do not change generated files, lockfiles, environment files, or configuration unless required and authorized.
- If additional files become necessary, explain why and keep the change minimal.

## Protected files and data

Do not modify, replace, move, or delete these without explicit user approval:

- Root `pending-task.md`
- `.agents/task-history/**`
- Secrets, credentials, private keys, certificates, and environment files
- Git metadata and repository configuration
- Production data, backups, and deployment artifacts
- Project-wide agent policies and control scripts, unless the task explicitly covers them

Never copy secrets into reports, logs, source code, or responses.

## Deletion and renaming

- Treat deletion, moving, and renaming as destructive changes.
- Ask for approval before deleting or replacing existing files.
- Do not use broad wildcard deletion.
- Preserve task history exactly as required by the project workflow.

## Review

After editing:

1. Inspect the complete diff.
2. Confirm every changed file belongs to the task.
3. Check for accidental secrets, debug output, and unrelated changes.
4. Report any file that could not be reviewed or validated.
