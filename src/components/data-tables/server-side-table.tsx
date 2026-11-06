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
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import pageSize from "@/constants/page-size";
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import type {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Cross } from "lucide-react";
import { useEffect, useState } from "react";
import DataNotFound from "../data-not-found";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  selectedRows?: (rows: unknown) => void;
  buttons?: React.ReactNode;
  serverSide?: boolean;
  totalCount?: number;
  controlledPageIndex?: number;
  controlledPageSize?: number;
  onPageChange?: (pageIndex: number, pageSize: number) => void;
  searchFields?: string[];
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
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

export default function ServerSideTable<TData, TValue>({
  columns,
  data,
  isLoading,
  searchPlaceholder,
  selectedRows,
  buttons,
  serverSide = false,
  totalCount = 0,
  controlledPageIndex = 1,
  controlledPageSize = 15,
  onPageChange,
  searchFields = ["name"],
  searchValue = "",
  onSearchChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const [clientPagination, setClientPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });

  const table = useReactTable({
    data,
    columns,
    pageCount: serverSide
      ? Math.ceil(totalCount / controlledPageSize)
      : undefined,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter: serverSide ? "" : globalFilter,
      pagination: serverSide
        ? { pageIndex: controlledPageIndex - 1, pageSize: controlledPageSize }
        : clientPagination,
    },

    manualPagination: serverSide,
    manualFiltering: serverSide,
    manualSorting: serverSide,
    autoResetPageIndex: !serverSide,

    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,

    onPaginationChange: (updater) => {
      if (serverSide) {
        const currentZeroBased = {
          pageIndex: controlledPageIndex - 1,
          pageSize: controlledPageSize,
        };
        const next =
          typeof updater === "function" ? updater(currentZeroBased) : updater;

        const targetOneBasedPage = next.pageIndex + 1;
        onPageChange?.(targetOneBasedPage, next.pageSize);
      } else {
        setClientPagination((prev) =>
          typeof updater === "function" ? updater(prev) : updater,
        );
      }
    },

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
    <Card className="bg-muted/50">
      <CardHeader>
        <div className="flex justify-between mb-1">
          <div className="flex items-start justify-start gap-2 md:justify-between">
            {buttons ?? ""}
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
        <div className="hidden flex-1 text-xs text-muted-foreground lg:flex">
          {serverSide ? (
            <>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount() || 1} &mdash; {totalCount ?? 0} total rows
            </>
          ) : (
            <>
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader className="sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8 text-xs">
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
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>

          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              const newPageSize = Number(value);
              if (serverSide) {
                onPageChange?.(1, newPageSize);
              } else {
                table.setPageSize(newPageSize);
                table.firstPage();
              }
            }}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="w-20">
              {pageSize.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-full items-center gap-4 lg:w-fit">
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1}
          </div>

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
                        if (table.getCanPreviousPage()) table.previousPage();
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
      </CardFooter>
    </Card>
  );
}
