# Data Table Instructions

## 1. General Rules

- Use HeroUI v2 Table as the underlying table UI.
- Use the existing `ThroughoutTable` component as the project's reusable table wrapper.
- Do not implement HeroUI Table directly when `ThroughoutTable` supports the requirement.
- Follow existing `IColumn`, `ETable`, and pagination conventions.
- Do not introduce another table library.

## 2. Column Definition

Define columns using `IColumn[]`.

```tsx
const columns: IColumn[] = [
  { uid: "sl", name: "SL", sortable: false },
  {
    uid: "totalApprovedCards",
    name: "Total Approved Cards",
    sortable: true,
    align: "start",
  },
];
```

- `uid`: Data field or custom column identifier.
- `name`: Column header text.
- `sortable`: Whether the column supports sorting.
- Use `sortable: false` for serial-number and non-sortable custom columns.

## 3. Cell Rendering

Use `useRenderCell` with `React.useCallback`.

```tsx
const useRenderCell = () => {
  return React.useCallback(
    (tableData: TCardApprovedByOfficer, columnKey: React.Key, index: number) => {
      const cellValue = tableData[columnKey as keyof TCardApprovedByOfficer];

      switch (columnKey) {
        case "sl":
          return <span>{index}</span>;

        default:
          return typeof cellValue === "object" ? JSON.stringify(cellValue) : cellValue;
      }
    },
    [listState],
  );
};
```

- Use `switch` for custom column rendering.
- Use `index` for serial-number columns.
- Access row data through `columnKey`.
- Handle object values appropriately.
- Follow the existing project implementation for callback dependencies.

## 4. Client-side Data Table

For client-side tables, use `ThroughoutTable` with the complete dataset.

```tsx
<ThroughoutTable
  CUSTOM_BUTTON={
    <>
      <Button
        onPress={handleExportToPdf}
        isDisabled={isLoading || isExportingPdf || listState.length === 0}
        color="primary"
        startContent={<Icon icon="icomoon-free:file-pdf" className="h-5 w-5" />}
        isLoading={isExportingPdf}
      >
        {isExportingPdf ? "Generating PDF..." : "Export PDF"}
      </Button>
    </>
  }
  DATA_LOADING={isLoading}
  SELECTION_MODE={ETable.none}
  TITLE="Card Approved By Officer Report"
  columns={columns ?? []}
  fetchData={listState ?? []}
  sortableColumn={true}
  useRenderCell={useRenderCell}
/>
```

- Pass the complete dataset through `fetchData`.
- Use `CUSTOM_BUTTON` for additional table actions.
- Use `DATA_LOADING` for the loading state.
- Configure `SELECTION_MODE` according to the requirement.
- Set `TITLE` appropriately.
- Use `sortableColumn` when sorting is required.

## 5. Server-side Pagination

For server-side pagination, keep API fetching and table state management in the page component.

Pass the API response data, pagination information, and callbacks to `ThroughoutTable`.

```tsx
<ThroughoutTable
  DATA_LOADING={isLoading}
  SELECTION_MODE={ETable.none}
  TITLE="Card Approved By Officer Report"
  columns={columns ?? []}
  fetchData={listState ?? []}
  sortableColumn={true}
  useRenderCell={useRenderCell}
  PAGE_ID={(page: number) => setValue("pageNo", page)}
  PAGINATION={pagination}
  onTableSearch={(search: string) => {
    setValue("search", search);
    setValue("pageNo", 1);
  }}
  per_page={perPage ?? 15}
  onRowsPerPageChange={(perPage: any) => {
    setValue("perPage", perPage);
    setValue("pageNo", 1);
  }}
  onSortChange={(columnName: string, isAscending: boolean) => {
    setValue("columnName", columnName);
    setValue("isAscending", isAscending);
  }}
/>
```

### Server-side Rules

- Keep API requests in the page component.
- Maintain pagination state using the project's established form or state management pattern.
- Pass the API result through `fetchData`.
- Pass pagination metadata through `PAGINATION`.
- Use `PAGE_ID` to update the current page.
- Use `onTableSearch` to update search and reset the page to `1`.
- Use `onRowsPerPageChange` to update page size and reset the page to `1`.
- Use `onSortChange` to update sorting state.
- Ensure API requests use the updated pagination, search, and sorting values.

## 6. Custom Buttons and Actions

- Use `CUSTOM_BUTTON` for additional table actions.
- Reuse existing project Button and Icon components.
- Disable actions when data is unavailable or an operation is running.
- Display loading indicators during asynchronous operations.
- Follow existing export functionality and error-handling conventions.

## 7. Restrictions

- Do not create a new table component when `ThroughoutTable` already supports the requirement.
- Do not introduce another table library without an explicit requirement.
- Do not move server-side API fetching into the reusable table component.
- Do not invent `ThroughoutTable` props.
- Do not use `any` when an existing project type is available.
- Do not duplicate pagination, search, or sorting logic unnecessarily.

**Core Principle:** Use `ThroughoutTable` for rendering. Keep client-side data handling simple, and keep server-side API, pagination, search, and sorting logic in the page component.
