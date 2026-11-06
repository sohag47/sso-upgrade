# Form Components Instructions

## 1. General Rules

- Use React Hook Form `Controller` for every form field.
- Use existing project components instead of creating duplicates.
- Follow the established component props and usage patterns.
- Display validation errors using the component's supported error props.
- Keep form values as strings where appropriate.

## 2. Standard Input — HeroUI v2

Use HeroUI v2 `Input` for standard form inputs.

```tsx
<Controller
  name="name"
  control={control}
  render={({ field }) => (
    <Input
      {...field}
      autoFocus
      label="Name"
      labelPlacement="outside"
      name="name"
      placeholder="Enter name"
      className="required-field"
      type="text"
      errorMessage={errors?.name?.message || ""}
      isInvalid={!!errors?.name?.message}
    />
  )}
/>
```

## 3. Textarea — HeroUI v2

Use HeroUI v2 `Textarea` for multiline text fields.

```tsx
<Controller
  name="RequestMessage"
  control={control}
  render={({ field }) => (
    <Textarea
      onChange={field.onChange}
      value={field.value || ""}
      label={<span className="font-medium text-dark dark:text-light">Message</span>}
      placeholder="Write your message here..."
      minRows={3}
      isInvalid={!!errors.RequestMessage}
      errorMessage={errors.RequestMessage?.message}
      labelPlacement="outside"
    />
  )}
/>
```

## 4. Dropdown / Autocomplete — Autocomplete2

Use the existing custom `Autocomplete2` component for single selection.

```tsx
<Controller
  control={control}
  name="buildingId"
  render={({ field }) => (
    <Autocomplete2
      isRequired
      label="Building"
      className="w-full"
      name="buildingId"
      placeholder="Select Building"
      selectItems={dBuilding}
      selectedValue={field.value}
      onSelectionChange={(_name, value) => field.onChange(value ? String(value) : "")}
      output="value"
      labelOutside
      isClearable
      isLoading={isLoading}
      error={errors.buildingId?.message}
    />
  )}
/>
```

alternative and more advanced usage of Autocomplete2 can be found in the project's existing implementations. Always inspect and reuse existing components before creating new ones.

```tsx
<Controller
  control={control}
  name="officerId"
  render={({ field }) => (
    <Autocomplete2
      error={errors.officerId?.message}
      label="User"
      className="w-full"
      name="officerId"
      placeholder="Select User"
      isLoading={d_users?.isLoading}
      selectItems={(dUsers as any) ?? []}
      selectedValue={field.value}
      onSelectionChange={(_name, value) => field.onChange(value ? String(value) : "")}
      output="value"
      labelOutside
      isClearable
      getOptionLabel={(user) => user?.name ?? ""}
      getOptionValue={(user) => user?.id}
      children={(user) => (
        <div className="flex flex-col items-start leading-tight">
          <span className="font-medium text-foreground">{user?.name}</span>
          <span className="text-xs text-muted-foreground">{user?.designationName}</span>
          <span className="text-xs text-muted-foreground">{user?.contactNo}</span>
        </div>
      )}
    />
  )}
/>
```

## 5. MultiSelect

Use the existing custom `MultiSelect` component for multiple selections.

```tsx
<Controller
  name="AccessMinistriesId"
  control={control}
  render={({ field }) => (
    <MultiSelect
      label="Applicable Ministries"
      labelOutside={true}
      isRequired={true}
      options={ministries ?? []}
      onValueChange={field.onChange}
      defaultValue={field.value}
      placeholder="Select Access Ministries"
      isLoading={d_branch}
      disabled={isAdmin ? false : true}
    />
  )}
/>
```

- Use `options` to provide available items.
- Use `onValueChange` to update the form value.
- Use `defaultValue` according to the existing component's implementation.
- Apply conditional disabled states when required.

## 6. DatePicker

Use the existing custom DatePicker component.

```tsx
<Controller
  name="toDate"
  control={control}
  render={({ field }) => (
    <DatePicker
      value={field.value}
      onChange={field.onChange}
      name="toDate"
      placeholder="DD-MM-YYYY"
      errorMessage={errors.toDate?.message}
      className="w-full"
      label={<span className="font-medium text-dark dark:text-light">To Date</span>}
      disableDatesBefore={watch("fromDate") ? moment(watch("fromDate")).toDate() : undefined}
    />
  )}
/>
```

## 7. File Input — HeroUI v2

Use HeroUI v2 `Input` with `type="file"` following this pattern.

```tsx
<Controller
  name="File"
  control={control}
  render={({ field: { onChange, value, ...field } }) => (
    <Input
      {...field}
      type="file"
      label={<span className="font-medium text-dark dark:text-light">Attachment</span>}
      placeholder="Upload file"
      accept="image/*,.pdf,.docx"
      onChange={(e) => {
        const file = e.target.files?.[0];
        onChange(file);
      }}
      isInvalid={!!errors.File}
      errorMessage={errors.File?.message}
      labelPlacement="outside"
      description="Image, PDF, or DOCX only. Max 2MB."
    />
  )}
/>
```

- Extract the selected file from `e.target.files`.
- Store the selected `File` object in React Hook Form.
- Do not spread `field.onChange` into the file input.
- Follow the required file type and size validation in the Zod schema.
- Follow existing project conventions for file preview and edit scenarios.

## 8. Component Selection Rules

| Field Type         | Required Component              |
| ------------------ | ------------------------------- |
| Text               | HeroUI v2 Input                 |
| Email              | HeroUI v2 Input                 |
| Number             | HeroUI v2 Input                 |
| Password           | HeroUI v2 Input                 |
| Textarea           | HeroUI v2 Textarea              |
| Single Dropdown    | Custom Autocomplete2            |
| Multiple Selection | Custom MultiSelect              |
| Date               | Custom DatePicker               |
| File               | HeroUI v2 Input (`type="file"`) |

For components not covered by an example, inspect existing project implementations before use.

## 9. Error Handling

- Display field-level validation errors.
- Use the component's existing error props.
- Do not create separate error UI when the component already supports it.
- Keep error messages clear and consistent.

## 10. Restrictions

- Do not use native HTML inputs when an existing project component is available.
- Do not use a different UI library for form inputs.
- Do not create duplicate Dropdown, MultiSelect, DatePicker, or other form components.
- Do not invent custom component props.
- Do not bypass React Hook Form for individual fields.

**Core Principle:** Reuse existing form components and follow their established usage patterns. Inspect component implementations whenever their APIs are unclear.
