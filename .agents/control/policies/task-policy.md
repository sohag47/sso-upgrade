# Task Policy

## Purpose

Define how an AI agent selects, understands, and executes the active development task.

## Single source of truth

- The root `pending-task.md` is the single source of truth for the active development task.
- Before starting or continuing development work, the agent must read the complete `pending-task.md`.
- The agent must not begin implementation until it understands the task purpose, requirements, constraints, and acceptance criteria.
- If `pending-task.md` is missing, empty, ambiguous, or unrelated to the request, stop implementation and ask the user to clarify or authorize an update.
- Do not silently create, replace, clear, or rewrite the active task.

## Required task information

A task should contain:

- Task ID
- Title or purpose
- Requirements and expected behavior
- Scope or relevant files, when known
- Constraints and prohibited actions
- Acceptance criteria
- Verification requirements
- Required commit message (message only; agents must not commit)

If important information is absent, ask only for the clarification needed to proceed safely.

## Execution rules

1. Read `pending-task.md` first for every development task or continuation.
2. Read root `AGENTS.md` and the execution policy before running commands.
3. Read `SKILLS_INDEX.md` and load only relevant existing instructions, skills, workflows, and documentation.
4. Inspect existing implementation and nearby patterns before editing.
5. Keep changes within the active task's scope.
6. Do not invent API contracts, data fields, business rules, or project conventions.
7. Ask before materially expanding the task scope.
8. Do not run restricted operations without explicit user approval.

## Task changes

- The user owns task creation and approval.
- If the user changes the requirements, update the task only with explicit authorization.
- Never delete or overwrite task history.
- Do not archive a task until its acceptance criteria and verification requirements have been addressed.
