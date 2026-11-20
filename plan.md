```
src/
├── app/(dashboard)/hr/employees/
│   ├── page.tsx                              # Thin route entry (renders EmployeeList)
│   ├── create/page.tsx                       # Thin route entry (renders EmployeeForm)
│   └── [id]/edit/page.tsx                    # Thin route entry (renders EmployeeForm in edit mode)
│
└── features/employees/
    ├── api/
    │   └── employee.api.ts                   # (was apiSlice.ts) RTK Query endpoints & tags
    ├── components/
    │   ├── EmployeeList.tsx                  # (was List.tsx) Table, filters, delete action
    │   └── EmployeeForm.tsx                  # (was Form.tsx) Create & Edit RHF + Zod form
    ├── schemas/
    │   └── employee.schema.ts                # (was schema.ts) Zod validation & inferred form type
    ├── types/
    │   └── employee.types.ts                 # (was type.ts) Entity, DTOs, query params
    ├── enums/
    │   └── employee.enums.ts                 # (was enum.ts) Status/role enums & label maps
    └── index.ts                              # Clean public exports

tests/
├── fixtures/
│   └── employee.fixtures.ts                  # Reusable mock records & factories
├── mocks/handlers/
│   └── employee.handlers.ts                  # MSW REST handlers for CRUD endpoints
├── unit/employees/
│   └── employee.schema.test.ts               # Unit test for Zod validation rules
└── integration/employees/
    ├── EmployeeList.test.tsx                 # Integration test for list rendering & delete
    └── EmployeeForm.test.tsx                 # Integration test for form validation & submit

```

```
src/
├── app/(auth)/login/
│   └── page.tsx                              # Thin route entry
│
└── features/auth/
    ├── api/
    │   └── auth.api.ts                       # RTK Query endpoints (fixed casing from authSLice)
    ├── components/
    │   └── LoginForm.tsx                     # Refactored UI component (no eslint-disable/any)
    ├── schemas/
    │   └── login.schema.ts                   # Zod schema & inferred input type
    ├── types/
    │   └── auth.types.ts                     # Request/Response/Error interfaces
    └── index.ts                              # Public feature exports

tests/
├── mocks/handlers/
│   └── auth.handlers.ts                      # MSW handlers for POST /auth/login
├── unit/auth/
│   └── login.schema.test.ts                  # Unit tests for loginSchema
└── integration/auth/
    └── LoginForm.test.tsx                    # Integration tests for form, toggle, API & redirect
```
