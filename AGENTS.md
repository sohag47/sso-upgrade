# AGENTS.md

This file is the central instruction and navigation guide for all AI coding agents working in this project. All agents must follow its applicable instructions and use it to discover project documentation, skills, specialized agents, and tool-specific configurations.

## 1. Project Identity

- **Project:** Next.js Admin Panel
- **Purpose:** A reusable, production-ready admin panel architecture for enterprise applications.
- **Application Type:** Enterprise web application.
- **Primary Users:** Administrators, employees, and internal business users.
- **Backend:** External REST API.

The project prioritizes maintainability, scalability, reliability, security, performance, and developer productivity.

## 2. AI Agent Entry Protocol

Before starting any task, agents must:

1. Read and follow this `AGENTS.md`.
2. Inspect the existing project structure and relevant source files.
3. Identify the technologies, dependencies, and established implementation patterns.
4. Consult relevant documentation, skills, and agent configurations when needed.
5. Understand the requested task and identify its scope.
6. Avoid assumptions about files, features, APIs, or configurations without verification.
7. Make focused changes and verify the implementation.

Read only the context necessary for the current task. Avoid unnecessary file inspection and unrelated modifications.

## 3. Technology Stack

The project uses the following preferred technologies:

| Category         | Technology                           |
| ---------------- | ------------------------------------ |
| Framework        | Next.js App Router                   |
| Language         | TypeScript                           |
| Styling          | Tailwind CSS                         |
| UI Components    | shadcn/ui                            |
| State Management | Redux Toolkit                        |
| API Management   | Redux Toolkit-based API architecture |
| Forms            | React Hook Form                      |
| Validation       | Zod                                  |
| Icons            | Lucide React                         |
| Version Control  | Git                                  |

Rules:

- Follow installed package versions and existing project conventions.
- Prefer existing dependencies over introducing alternatives.
- Avoid unnecessary packages and duplicate solutions.
- Do not upgrade, replace, or remove dependencies without justification.
- Consult official documentation when API behavior is uncertain.

## 4. Project Architecture

The project follows a feature-oriented architecture using Next.js App Router.

### Directory Responsibilities

| Directory                 | Responsibility                                 |
| ------------------------- | ---------------------------------------------- |
| `src/app/`                | Routing, pages, layouts, and route handlers    |
| `src/components/ui/`      | UI primitives and shadcn/ui components         |
| `src/components/shared/`  | Application-wide reusable components           |
| `src/components/layouts/` | Shared layouts and navigation                  |
| `src/features/`           | Feature-specific components and business logic |
| `src/hooks/`              | Globally reusable React hooks                  |
| `src/lib/`                | Shared libraries and configurations            |
| `src/store/`              | Redux store and global state                   |
| `src/types/`              | Shared TypeScript types                        |
| `src/utils/`              | Shared utility functions                       |
| `public/`                 | Static assets                                  |
| `docs/`                   | Project documentation                          |

Architecture rules:

- Organize business functionality inside `features/`.
- Keep feature-specific code within its owning feature whenever practical.
- Keep genuinely reusable functionality in shared directories.
- Separate routing concerns from business logic.
- Follow existing folder and naming conventions.
- Do not create unnecessary files, directories, or abstraction layers.
- Inspect the existing architecture before making structural changes.

## 5. Instruction Hierarchy

Agents must consider the following instruction sources:

1. AI platform and system instructions.
2. Explicit user requirements.
3. Root `AGENTS.md`.
4. Applicable nested `AGENTS.md` files.
5. Referenced project documentation.
6. Applicable reusable skills.
7. AI tool-specific configurations.

This is the project's instruction policy, not a replacement for individual AI tools' native instruction precedence.

Rules:

- Follow applicable instructions according to their scope and priority.
- Nested instructions apply to their relevant directories.
- Skills provide workflows, not replacements for mandatory instructions.
- Tool-specific configurations must not silently weaken project requirements.
- Identify and resolve instruction conflicts safely.
- Ask for clarification when a significant conflict cannot be resolved.

## 6. Documentation Index

Project documentation is maintained separately from this file.

| Document                      | Purpose                                 |
| ----------------------------- | --------------------------------------- |
| `docs/project-overview.md`    | Project overview and requirements       |
| `docs/architecture.md`        | Application architecture                |
| `docs/coding-standards.md`    | Detailed coding conventions             |
| `docs/api-guidelines.md`      | API integration rules                   |
| `docs/form-guidelines.md`     | Form handling and validation            |
| `docs/state-management.md`    | Redux architecture and state management |
| `docs/ui-guidelines.md`       | UI and component standards              |
| `docs/security-guidelines.md` | Security requirements                   |
| `docs/business-rules.md`      | Application business rules              |

These documents are a proposed documentation structure. Consult existing files and create missing documents only when needed.

## 7. Skills Registry

Reusable task workflows are maintained under:

`.agents/skills/`

Each skill should have its own directory containing a `SKILL.md` file.

Recommended skills:

- `crud-development` — CRUD feature implementation.
- `bug-fixing` — Systematic bug investigation and resolution.
- `api-integration` — External API integration.
- `code-review` — Code quality and security review.

Rules:

- Discover available skills before using them.
- Use a skill when its purpose matches the current task.
- Follow its documented workflow.
- Avoid loading unrelated skills.
- Do not duplicate permanent project instructions inside skills.

## 8. Agent Registry

Specialized agent configurations are maintained separately from general project instructions.

Recommended agent roles:

- **Planner:** Requirement analysis and implementation planning.
- **Developer:** Feature implementation and bug fixing.
- **Reviewer:** Code quality, security, and implementation review.

The proposed organizational location is:

`.agents/agents/`

Actual configuration files must follow the format and location supported by the active AI tool.

Rules:

- Delegate tasks according to agent responsibilities.
- Avoid unnecessary agent delegation.
- Keep parallel tasks independent when possible.
- Prevent conflicting modifications to shared files.
- Review delegated work before accepting it.

## 9. Tool Configuration Registry

AI tool-specific configurations must remain separate from tool-independent project instructions.

Recommended locations:

| Tool / Purpose       | Location          |
| -------------------- | ----------------- |
| OpenAI Codex         | `.codex/`         |
| GitHub Copilot       | `.github/`        |
| Shared Skills        | `.agents/skills/` |
| Project Instructions | `AGENTS.md`       |

Rules:

- Follow each tool's supported configuration format.
- Do not assume one tool can automatically read another tool's configuration.
- Keep tool-specific settings separate.
- Document additional tools, MCP servers, hooks, and integrations when introduced.
- Never assume a tool or integration is available without verification.

## 10. Development Principles & Coding Standards

All implementations must follow these principles:

- Prefer simple, readable, maintainable code.
- Use TypeScript with strict type safety.
- Avoid `any`, unnecessary type assertions, and duplicated logic.
- Build reusable components when reuse provides genuine value.
- Keep components focused on clear responsibilities.
- Follow existing naming and file organization conventions.
- Prefer existing utilities and shared components.
- Avoid unnecessary dependencies and over-engineering.
- Preserve existing functionality.
- Consider accessibility, responsive design, and performance.
- Follow detailed conventions in the relevant project documentation.

## 11. Development Workflow & Quality Assurance

Follow this development lifecycle:

1. **Understand:** Analyze requirements and existing implementation.
2. **Inspect:** Identify affected files, dependencies, and potential side effects.
3. **Plan:** Define a focused implementation approach.
4. **Implement:** Make only necessary changes.
5. **Verify:** Run relevant linting, type checks, tests, and builds when available.
6. **Review:** Inspect the final changes for correctness and regressions.
7. **Report:** Summarize implementation and verification results.

Rules:

- Do not claim tests passed unless they were actually executed.
- Do not ignore existing failures without reporting them.
- Avoid unrelated refactoring.
- Update relevant documentation when implementation changes affect it.
- Never sacrifice correctness for speed.

## 12. Security, Git & Reporting Guidelines

### Security

- Never expose secrets, credentials, tokens, or private configuration.
- Never hardcode sensitive values.
- Validate and safely handle external API data.
- Follow secure authentication, authorization, and error-handling practices.
- Do not introduce insecure dependencies or patterns.
- Respect existing permission and security boundaries.

### Git & Change Management

- Inspect existing Git changes before modifying files.
- Never overwrite or discard unrelated user changes.
- Do not reset, revert, commit, push, or modify Git history without authorization.
- Keep changes focused and reviewable.
- Avoid modifying generated files unless required.

### Final Reporting

After completing a task, report:

- What was implemented or changed.
- Which important files were affected.
- What verification was performed.
- Any failed checks or remaining issues.
- Any important assumptions or decisions.

Be concise, accurate, and transparent. Never claim work was completed or verified when it was not.
