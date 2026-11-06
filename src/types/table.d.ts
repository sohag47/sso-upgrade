type IColumns = {
  id?: number | string;
  uid: string;
  name: string;
  sortable?: boolean;
}[];

type TSearchable = string | number | undefined | null;

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  searchFields?: string[];
  searchPlaceholder?: string;
  selectedRows?: (selectedRows: Record<string, boolean>) => void;
  buttons?: React.JSX.Element;
  onPageChange?: () => void;
};
