# Project Development Guidelines

## 1. Project Overview

This is a Next.js Admin Panel built with TypeScript, React, Tailwind CSS, Redux Toolkit, React Hook Form, Zod, and the existing UI component system.

The goal is to maintain a consistent, reliable, and maintainable codebase.

These guidelines apply to every AI coding agent working on this project.

## 2. Core Principles

- Inspect existing code before making changes.
- Follow existing architecture and coding conventions.
- Reuse existing components, utilities, hooks, and patterns.
- Avoid unnecessary dependencies, abstractions, and refactoring.
- Never invent API contracts or business rules.
- Keep implementations simple and maintainable.
- Modify only files relevant to the current task.
- Ask for clarification when requirements are ambiguous.

## 3. Project Structure

Follow the existing source structure and conventions.

Inspect relevant directories before creating or modifying files. Do not introduce new architectural patterns without a clear requirement.

## 4. Project Guidance

### Guidance Discovery Index

The root-level `SKILLS_INDEX.md` maps task types to relevant instructions, skills, and workflows.

Before implementation:

1. Read `SKILLS_INDEX.md`.
2. Identify the guidance files relevant to the current task.
3. Load only those files.
4. Do not read unrelated guidance files.

If an indexed file does not exist, do not assume its contents.

## 5. Task Management

The root-level `pending-task.md` is the single source of truth for the currently active task.

### Mandatory Startup

Whenever the user asks to start or continue a development task:

1. Locate and read the root-level `pending-task.md` first.
2. Understand its Task ID, purpose, requirements, and acceptance criteria.
3. Read the execution policy.
4. Load only relevant instructions, skills, and workflows.
5. Inspect the existing implementation.
6. Start implementation only after understanding the requirements.

**Never start implementation before reading `pending-task.md`.**

Do not infer the current task from previous conversations or task history.

### Pending Task Rules

Every task must include:

- Task ID (sequential: TASK-0001, TASK-0002, etc.)
- Title and purpose
- Requirements
- Acceptance criteria
- Relevant context, when necessary
- Required verification
- Commit message

If `pending-task.md` does not exist or requirements are incomplete, ask the user for clarification.

Never automatically overwrite, delete, or replace `pending-task.md`.

### Task History

Archive completed tasks in `.agents/task-history/`.

Filename format:

`TASK-0001-short-task-purpose.md`

Rules:

- Preserve an exact copy of the original `pending-task.md`.
- Never overwrite an existing history file.
- Archive only fully completed tasks.
- Do not modify archived requirements or acceptance criteria.
- Never delete or replace `pending-task.md` without explicit user permission.

The user prepares or updates `pending-task.md` for the next task.

## 6. Task Execution Process

For every task:

1. Read the root-level `pending-task.md` first.
2. Read `AGENTS.md` and the execution policy.
3. Load only relevant instructions, skills, and workflows.
4. Inspect existing implementation and related files.
5. Understand the impact of the changes.
6. Implement only the requested changes.
7. Review the final diff.
8. Run permitted verification commands.
9. Report results and remaining issues.
10. Archive the original task file only when all acceptance criteria are satisfied.

Follow the Task History rules in Section 5. Do not perform unrelated improvements.

## 7. Commit Message Policy

Every task must include a commit message.

The agent must:

- Use the commit message provided in the task file.
- Include it in the completion report.
- Preserve it in the archived task file.

The agent must NEVER execute Git commit or push operations.

The user handles final review, commit, and push manually.

## 8. Development Rules

### Code Quality

- Use TypeScript appropriately.
- Avoid unnecessary `any`.
- Keep components focused and reusable.
- Follow existing naming conventions.
- Avoid duplicated functionality.
- Handle loading, error, and empty states where applicable.

### Forms

Follow existing React Hook Form and Zod patterns. Read relevant form instructions and skills.

### Data Tables

Reuse existing table components and pagination patterns. Do not introduce another table library without explicit approval.

### API Integration

Follow existing API integration and Redux Toolkit patterns. Never invent API contracts.

### UI Implementation

Reuse existing UI components and styling conventions. Do not introduce a new UI library without explicit approval.

## 9. Completion Report

After completing a task, report:

- Task ID and title
- Summary of changes
- Files created or modified
- Verification commands and results
- Known issues or incomplete requirements
- Required commit message
- Task history file path

Never claim a command passed if it was not executed.

Never report a task as complete if its acceptance criteria are not satisfied.

## 10. Final Responsibility

The AI agent is responsible for implementation and verification within permitted boundaries.

The user retains control over:

- Restricted command execution
- Final code review
- Git commit and push
- Deployment and release decisions
