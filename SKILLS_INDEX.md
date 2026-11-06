# Skills and Instructions Index

This file helps AI agents identify relevant project instructions, skills, workflows, and documentation.

**Rule:** Load only the files relevant to the current task. Never read everything unnecessarily.

## 1. Instructions

Location: `.agents/instructions/`

| Task / Area           | Relevant File                        |
| --------------------- | ------------------------------------ |
| General coding rules  | `general.instructions.md`            |
| UI implementation     | `ui.instructions.md`                 |
| Component development | `component.instructions.md`          |
| Form implementation   | `form.instructions.md`               |
| Form components       | `form-components.instructions.md`    |
| Data tables           | `data-table.instructions.md`         |
| Styling and Tailwind  | `styling-guidelines.instructions.md` |
| Icons                 | `icon-guidelines.instructions.md`    |
| Testing               | `testing.instructions.md`            |
| Command permissions   | `execution.instructions.md`          |

## 2. Skills

Location: `.agents/skills/`

| Task                   | Relevant Skill                    |
| ---------------------- | --------------------------------- |
| CRUD development       | `crud-development/SKILL.md`       |
| Form development       | `form-development/SKILL.md`       |
| Data table development | `data-table-development/SKILL.md` |
| Bug fixing             | `bug-fixing/SKILL.md`             |
| API integration        | `api-integration/SKILL.md`        |
| Code review            | `code-review/SKILL.md`            |

## 3. Workflows

Location: `.agents/workflows/`

| Task                   | Relevant Workflow           |
| ---------------------- | --------------------------- |
| New feature            | `feature-development.md`    |
| CRUD development       | `crud-development.md`       |
| Bug fixing             | `bug-fixing.md`             |
| API integration        | `api-integration.md`        |
| Code review            | `code-review.md`            |
| Form development       | `form-development.md`       |
| Data table development | `data-table-development.md` |

## 4. Project Documentation

Documentation may exist in the project root, `docs/`, or other documentation directories.

Check the available documentation files and read only those relevant to the current task.

| Task / Area        | Documentation to Look For                                            |
| ------------------ | -------------------------------------------------------------------- |
| Project setup      | `README.md`, setup guides                                            |
| Architecture       | Architecture and project structure documents                         |
| API integration    | API documentation, endpoint references, request/response examples    |
| UI development     | UI guidelines, design system documentation                           |
| State management   | Redux or state management documentation                              |
| Database           | Database schema and relationship documentation                       |
| Business logic     | Business rules and feature specifications                            |
| Deployment         | Build, deployment, and environment documentation                     |
| Other requirements | Relevant `.md`, `.mdx`, `.txt`, `.pdf`, or other documentation files |

Do not assume a documentation file exists. Verify its actual location and filename before reading it.

## 5. Guidance Selection Rules

- New feature → Feature workflow and relevant instructions, skills, and documentation.
- CRUD → CRUD skill and relevant form, table, and API guidance.
- Form → Form skill and form-related instructions.
- Data table → Data table skill and instructions.
- Bug fix → Bug-fixing skill and relevant documentation.
- API integration → API skill and API documentation.
- Code review → Code-review skill and testing instructions.

## 6. Important Rules

- Always read root `AGENTS.md` first.
- Always read root `pending-task.md` before starting or continuing a task.
- Always read `.agents/instructions/execution.instructions.md` before executing commands.
- Use this index to identify relevant guidance and documentation.
- Do not load unrelated files.
- Verify that referenced files exist before reading them.
- If documentation conflicts with actual implementation, investigate and report the discrepancy instead of silently assuming either is correct.
- Never invent undocumented API contracts or business rules.
