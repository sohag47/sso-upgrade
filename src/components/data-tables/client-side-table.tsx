/* eslint-disable react-hooks/incompatible-library */
"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { Cross } from "lucide-react";
import { useEffect, useState } from "react";
import DataNotFound from "../data-not-found";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  searchFields?: string[];
  searchPlaceholder?: string;
  selectedRows?: (rows: unknown) => void;
  buttons?: React.ReactNode;
}

function TableRowRenderer<TData>({ row }: { row: Row<TData> }) {
  return (
    <TableRow data-state={row.getIsSelected() && "selected"}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default function ClientSideTable<TData, TValue>({
  columns,
  data,
  isLoading,
  searchFields = ["name"],
  searchPlaceholder,
  selectedRows,
  buttons,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      return searchFields.some((field) => {
        const value = row.getValue(field);
        return String(value).toLowerCase().includes(filterValue.toLowerCase());
      });
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const isFiltered = table.getState().columnFilters.length > 0;

  useEffect(() => {
    if (selectedRows && rowSelection) {
      selectedRows(rowSelection);
    }
  }, [rowSelection, selectedRows]);

  return (
    <>
      <div>
        <div className="mb-3 flex items-start justify-start gap-2 md:justify-between">
          <Input
            placeholder={searchPlaceholder ?? "Filter data..."}
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="h-8 w-56 bg-white dark:bg-black"
            type="search"
          />
          {buttons ? buttons : ""}
        </div>

        <div className="flex justify-end">
          {isFiltered && (
            <Button
              variant="destructive"
              onClick={() => {
                table.resetColumnFilters();
                table.firstPage();
              }}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {isLoading && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <div className="flex items-center justify-center">
                      <Spinner />
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && table.getRowModel().rows?.length
                ? table
                    .getRowModel()
                    .rows.map((row) => (
                      <TableRowRenderer key={row.id} row={row} />
                    ))
                : !isLoading && (
                    <TableRow>
                      <TableCell colSpan={columns.length}>
                        <DataNotFound />
                      </TableCell>
                    </TableRow>
                  )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>

          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  const newPageSize = Number(value);
                  table.setPageSize(newPageSize);
                  table.firstPage();
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[15, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount() || 1}
            </div>

            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              {(() => {
                const currentPage = table.getState().pagination.pageIndex + 1;
                const totalPages = table.getPageCount() || 1;

                const getVisiblePages = () => {
                  if (totalPages <= 3) {
                    return Array.from({ length: totalPages }, (_, i) => i + 1);
                  }
                  if (currentPage === 1) {
                    return [1, 2, 3];
                  }
                  if (currentPage === totalPages) {
                    return [totalPages - 2, totalPages - 1, totalPages];
                  }
                  return [currentPage - 1, currentPage, currentPage + 1];
                };

                const visiblePages = getVisiblePages();

                return (
                  <Pagination className="mx-0 w-auto">
                    <PaginationContent>
                      {/* First Page Button */}
                      <PaginationItem>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 p-0"
                          onClick={() => table.firstPage()}
                          disabled={!table.getCanPreviousPage()}
                        >
                          <span className="sr-only">Go to first page</span>
                          <IconChevronsLeft className="h-4 w-4" />
                        </Button>
                      </PaginationItem>

                      {/* Previous Page Button */}
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (table.getCanPreviousPage())
                              table.previousPage();
                          }}
                          className={
                            !table.getCanPreviousPage()
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {/* First Page Link + Ellipsis */}
                      {visiblePages[0] > 1 && (
                        <>
                          <PaginationItem>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                table.firstPage();
                              }}
                              className="cursor-pointer"
                            >
                              1
                            </PaginationLink>
                          </PaginationItem>
                          {visiblePages[0] > 2 && (
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          )}
                        </>
                      )}

                      {/* 3 Active Window Pages */}
                      {visiblePages.map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === page}
                            onClick={(e) => {
                              e.preventDefault();
                              table.setPageIndex(page - 1);
                            }}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      {/* Last Page Ellipsis + Link */}
                      {visiblePages[visiblePages.length - 1] < totalPages && (
                        <>
                          {visiblePages[visiblePages.length - 1] <
                            totalPages - 1 && (
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          )}
                          <PaginationItem>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                table.lastPage();
                              }}
                              className="cursor-pointer"
                            >
                              {totalPages}
                            </PaginationLink>
                          </PaginationItem>
                        </>
                      )}

                      {/* Next Page Button */}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (table.getCanNextPage()) table.nextPage();
                          }}
                          className={
                            !table.getCanNextPage()
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {/* Last Page Button */}
                      <PaginationItem>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 p-0"
                          onClick={() => table.lastPage()}
                          disabled={!table.getCanNextPage()}
                        >
                          <span className="sr-only">Go to last page</span>
                          <IconChevronsRight className="h-4 w-4" />
                        </Button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
