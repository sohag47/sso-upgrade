# Project Overview

## Purpose
A reusable, maintainable Next.js admin panel foundation for enterprise applications.

## Application Scope
- Web-based internal administration interface.
- Frontend communicates with an external REST API.
- Supports authenticated administrative workflows where required by the backend.
- Provides reusable layouts, navigation, forms, tables, feedback states, and feature modules.

## Target Users
- Administrators
- Employees
- Internal business users

## Technology Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Redux Toolkit
- React Hook Form
- Zod
- Lucide React
- Git

Use the versions already installed in the project. This document describes the preferred stack, not permission to add or upgrade dependencies.

## Core Capabilities
- Feature-oriented application structure.
- Reusable UI components and layouts.
- Centralized global state with Redux Toolkit.
- Consistent external API integration.
- Validated and accessible forms.
- Responsive administrative pages.
- Consistent loading, empty, success, and error states.

## Backend Integration
The backend is an external service exposed through REST APIs. Do not assume backend source code, database schemas, endpoints, authentication mechanisms, or API contracts. Inspect existing configuration and implementation, or ask for missing API details.

## Constraints
- Keep implementation focused and maintainable.
- Prefer existing dependencies and patterns.
- Do not expose secrets in client-side code.
- Do not invent business rules or API behavior.
- Follow `AGENTS.md` and the relevant documents in this directory.
