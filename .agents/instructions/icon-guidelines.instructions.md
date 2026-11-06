# Icon Instructions

## 1. Icon Libraries

Use the existing project icon libraries:

- Lucide React
- Iconify React (`@iconify/react`)

```tsx
import { Icon } from "@iconify/react";
import { Plus, Pencil, Trash2 } from "lucide-react";
```

- Reuse existing icon imports and conventions.
- Do not introduce another icon library.
- Prefer Lucide React for standard interface icons.
- Use Iconify when a specific icon is unavailable in Lucide React or when the project already uses an Iconify icon.

## 2. Icon Selection

Choose icons that clearly represent their actions or meanings.

Use appropriate icons for:

- Add / Create
- Edit / Update
- Delete
- View
- Search
- Filter
- Save
- Cancel
- Upload
- Download
- Export
- Print
- PDF
- Settings

Use consistent icons for the same actions throughout the application.

## 3. Lucide React Usage

- Import only the icons required by the component.
- Use consistent icon dimensions.
- Follow existing Tailwind styling conventions.

Example:

```tsx
import { Plus, Pencil, Trash2 } from "lucide-react";

<Button>
  <Plus className="h-4 w-4" />
  Add New
</Button>;
```

## 4. Iconify React Usage

Use the existing `Icon` component from `@iconify/react`.

```tsx
import { Icon } from "@iconify/react";

<Icon icon="icomoon-free:file-pdf" className="h-5 w-5" />;
```

- Use valid Iconify icon identifiers.
- Follow existing project icon naming conventions.
- Use Tailwind classes for dimensions and styling.
- Do not replace existing Iconify identifiers without a reason.

## 5. Icon Styling

- Follow existing icon sizes and styling conventions.
- Use theme-aware colors.
- Keep icon alignment consistent with adjacent text.
- Follow existing button icon placement conventions.
- Avoid unnecessary decorative icons.

## 6. Icon Buttons

- Use existing project Button components.
- Provide accessible labels or tooltips for icon-only buttons.
- Use appropriate disabled and loading states.
- Use confirmation dialogs for destructive actions when required.

## 7. Restrictions

- Do not use emoji as UI icons.
- Do not introduce additional icon libraries.
- Do not mix icon styles unnecessarily.
- Do not use arbitrary icon sizes or colors.
- Do not use unclear icons for important actions.

**Core Principle:** Use Lucide React for standard interface icons and Iconify React when a specific icon or existing project convention requires it. Maintain consistent icon usage throughout the application.
