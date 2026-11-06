# TASK-0001: Project Architecture and Codebase Audit

## 1. Purpose

Perform a comprehensive review of the existing project and provide actionable recommendations to improve code quality, architecture, maintainability, performance, security, and developer experience.

This is an audit-only task. Do not modify the project.

## 2. Requirements

Inspect the existing project and evaluate the following areas:

### A. Project Architecture

- Review the folder structure and architectural patterns.
- Identify unnecessary complexity or duplication.
- Evaluate separation of concerns.
- Check consistency across features and modules.

### B. Code Quality

- Identify code duplication and maintainability issues.
- Review TypeScript usage and type safety.
- Identify unnecessary `any`, unsafe type assertions, and inconsistent patterns.
- Check component size and reusability.

### C. React and Next.js

- Review component structure and rendering patterns.
- Identify unnecessary client components and state management.
- Check hooks usage and potential performance issues.
- Review routing, layouts, and data-fetching patterns.

### D. State Management and API Integration

- Review Redux Toolkit implementation.
- Check API integration consistency.
- Identify duplicated API logic or unnecessary state.
- Review loading, error, and response handling.

### E. Forms and Validation

- Review React Hook Form and Zod implementation.
- Check validation consistency.
- Identify duplicated form logic and reusable component opportunities.

### F. UI and Styling

- Review existing UI component usage.
- Check Tailwind CSS consistency.
- Identify duplicated styling and inconsistent UI patterns.
- Review icon usage and accessibility.

### G. Performance and Security

- Identify potential performance bottlenecks.
- Review unnecessary dependencies.
- Check for exposed secrets, unsafe environment variable usage, and common security risks.
- Do not expose secret values in the audit report.

### H. Testing and Developer Experience

- Review existing testing setup and coverage.
- Evaluate linting, formatting, and TypeScript verification.
- Identify missing development tools or workflow improvements.

## 3. Audit Rules

- Inspect the actual source code before making recommendations.
- Read `AGENTS.md`, `SKILLS_INDEX.md`, and relevant project documentation.
- Follow the relevant instructions and execution policy.
- Use existing project conventions as the baseline.
- Do not assume a package or feature is used just because it is installed.
- Do not invent problems without evidence.
- Reference specific file paths and line numbers whenever possible.
- Clearly distinguish confirmed issues from potential improvements.
- Avoid recommending unnecessary libraries or architectural rewrites.

## 4. Restrictions

This is a read-only task.

- Do not modify, create, or delete project files.
- Do not install, remove, or update dependencies.
- Do not run development servers or production builds.
- Do not execute database mutations.
- Do not perform Git commit, push, or other Git mutations.
- Follow `.agents/instructions/execution.instructions.md`.
- Ask for permission before executing any restricted operation.

## 5. Expected Deliverable

Provide a structured audit report in the final response.

Include:

### A. Executive Summary

Overall assessment of the project's current condition.

### B. Findings

For each finding, include:

- Finding ID
- Category
- Description
- Evidence (file path and line number)
- Impact
- Severity: Critical / High / Medium / Low
- Recommended solution

### C. Improvement Recommendations

Prioritize recommendations into:

1. Must Fix
2. Should Improve
3. Optional Improvements

### D. Architecture Recommendations

Suggest improvements only where there is clear evidence of a problem.

### E. Positive Findings

Highlight existing good practices worth preserving.

### F. Suggested Roadmap

Provide a practical, prioritized improvement roadmap.

### G. Verification Summary

List the inspection and verification commands actually executed, including results and anything not run.

## 6. Acceptance Criteria

- The project has been inspected using actual source code.
- Findings include concrete evidence.
- Recommendations are actionable and prioritized.
- Existing good practices are identified.
- No project files have been modified.
- No restricted operations have been performed without permission.
- The final report clearly distinguishes confirmed issues from suggestions.

## 7. Commit Message

`docs(audit): review project architecture and document improvement recommendations`

No commit should be created. This message is for task history and reporting only.
