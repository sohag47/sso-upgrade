# Execution and Permission Policy

## 1. Purpose

This document defines which commands an AI coding agent may execute while working on this project.

The purpose is to prevent unintended changes to the project, Git history, dependencies, environment, and external systems.

These rules apply to every task and take priority over general task instructions.

## 2. Allowed Commands

The agent may execute the following commands without additional permission.

### Git Inspection

```bash
git status
git diff
git diff --check
git log
git show
git branch --show-current
```

These commands are permitted for inspecting the current working tree and Git history.

### Code Verification

The following commands are permitted when the required tools are already installed locally and their scripts have been inspected for unintended side effects.

```bash
bunx tsc --noEmit
bun run lint
bun run fmt:check
```

### Tests

The agent may run existing, configured, non-mutating test commands.

Examples:

```bash
bun test
bunx vitest run
```

Do not install missing packages or initialize a test framework automatically.

### File Inspection

The agent may:

- List files and directories.
- Read existing files.
- Search source code.
- Inspect project configuration.
- Inspect package dependencies.
- Read logs and error messages.
- Compare existing implementations.

Read-only inspection is allowed.

## 3. Restricted Commands

The agent must NOT execute the following commands without explicit user permission.

### Git Mutations

- `git add`
- `git commit`
- `git push`
- `git pull`
- `git merge`
- `git rebase`
- `git reset`
- `git checkout`
- `git switch`
- `git clean`
- `git stash`
- Any other command that changes Git history, branches, or the index.

### Dependency Changes

- `bun install`
- `bun add`
- `bun remove`
- `bun update`
- Equivalent npm, pnpm, yarn, or other package manager mutation commands.
- Any command that modifies dependency versions or lockfiles.

### Application Lifecycle and Build

- `bun run dev`
- `bun run build`
- `bun run start`
- Production builds.
- Deployment commands.
- Publishing commands.
- Commands that start or stop application services.

### Database Operations

- Database migrations.
- Schema changes.
- Data insertion, updates, or deletion.
- Database reset or seeding operations.
- Any operation that modifies database state.

### External Operations

- API requests that create, update, or delete external data.
- Cloud resource modifications.
- Deployment or infrastructure changes.
- Sending emails, notifications, or messages.
- Any operation that changes an external system.

### Destructive Operations

- Deleting files or directories.
- Overwriting unrelated files.
- Bulk file modifications.
- Formatting commands that modify files.
- Environment or system configuration changes.
- Any command with potentially destructive side effects.

## 4. Permission Requirements

Before executing a restricted command:

1. Explain why the command is needed.
2. Show the exact command or operation.
3. Explain its expected impact.
4. Wait for explicit user approval.

A task description or general instruction does not automatically grant permission to execute restricted commands.

Never assume permission.

## 5. File Modification Policy

The agent may modify project source files when the requested task requires it.

However:

- Modify only files relevant to the task.
- Do not delete unrelated files.
- Do not overwrite existing user work.
- Do not modify environment files or secrets.
- Do not modify dependency or lock files without permission.
- Review the final diff before reporting completion.

If a requested implementation requires a restricted operation, stop and ask for permission.

## 6. Verification and Reporting

At the end of every task, report:

- Commands actually executed.
- Commands that passed.
- Commands that failed.
- Commands not executed.
- Any verification that could not be performed.

Never claim successful verification without actually running the command.

Do not run additional commands merely to make the report look complete.

## 7. Git Ownership

The user owns all Git operations that modify repository state.

The agent may inspect Git status, diffs, and history.

The agent must never commit, push, merge, rebase, reset, or otherwise modify Git history without explicit permission.

The user performs the final review and manually commits and pushes the changes.

## 8. Priority

This policy applies to all tasks, skills, workflows, and other project instructions.

If another instruction conflicts with this document, follow this execution policy.

When uncertain whether an operation is safe or permitted, stop and ask the user before executing it.
