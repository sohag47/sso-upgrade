# Architecture

## Architectural Approach
Use Next.js App Router with feature-oriented organization. Keep route composition, feature logic, shared UI, and infrastructure concerns clearly separated.

## Suggested Structure
```text
src/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── api/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── shared/
│   └── layouts/
├── features/
│   └── feature-name/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       ├── utils/
│       └── ...
├── hooks/
├── lib/
├── store/
├── types/
└── utils/
```

This is a reference structure. Inspect the actual repository and preserve established conventions rather than restructuring it automatically.

## Responsibilities
- `app/`: routes, layouts, pages, loading/error boundaries, and route handlers when needed.
- `components/ui/`: low-level UI primitives.
- `components/shared/`: application-wide reusable components.
- `components/layouts/`: shared page and navigation layouts.
- `features/`: feature-specific UI, state, types, and business logic.
- `hooks/`: genuinely reusable hooks.
- `lib/`: shared integrations and library configuration.
- `store/`: Redux store setup and shared state configuration.
- `types/`: shared TypeScript types.
- `utils/`: small reusable utility functions.

## Dependency Direction
- Routes compose feature components.
- Features may use shared components, hooks, utilities, and store infrastructure.
- Shared components must not depend on a specific feature.
- Avoid circular dependencies.
- Keep feature-specific code inside its feature unless reuse is demonstrated.

## Component Boundaries
- Prefer Server Components by default.
- Add Client Components only when browser interaction, client-side state, or lifecycle behavior requires them.
- Keep client boundaries as small as practical.
- Do not move server-only values into client bundles.

## Change Rules
- Inspect current architecture before adding folders or abstractions.
- Avoid premature abstractions and unnecessary layers.
- Do not relocate files solely to match this example.
