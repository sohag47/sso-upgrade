/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ClientSideTable from "@/components/data-tables/client-side-table";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionCards } from "@/features/dashboard/SectionCards";
import { useGetDashboardQuery } from "@/stores/features/user-slice";
import { ColumnDef } from "@tanstack/react-table";
import { AlertCircleIcon, ArrowRight } from "lucide-react";
import moment from "moment";
import Link from "next/link";

export default function DashboardCounts() {
  const { isLoading, isError, data, error } = useGetDashboardQuery();

  const errorMessage = (error as any)?.data
    ? (error as any)?.data?.message
    : "";

  const columns: ColumnDef<TLast15Data>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "studentIdNo",
      header: "Student Id",
      cell: ({ row }) => row.getValue("studentIdNo"),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.getValue("name"),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) =>
        row.original?.type ? (
          <Badge variant={"default"}>
            {row.original?.type.toLocaleUpperCase()}
          </Badge>
        ) : (
          ""
        ),
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => row.getValue("department"),
    },
    {
      accessorKey: "office",
      header: "Office",
      cell: ({ row }) => row.getValue("office"),
    },
    {
      accessorKey: "inTime",
      header: "IN Time",
      cell: ({ row }) => (
        <span>
          {row?.original?.inTime
            ? moment(row?.original?.inTime, "HH:mm:ss").format("hh:mm A")
            : ""}
        </span>
      ),
    },
    {
      accessorKey: "outTime",
      header: "OUT Time",
      cell: ({ row }) => (
        <span>
          {row?.original?.outTime
            ? moment(row?.original?.outTime, "HH:mm:ss").format("hh:mm A")
            : ""}
        </span>
      ),
    },
    {
      accessorKey: "rfid",
      header: "RFID",
      cell: ({ row }) => row.getValue("rfid"),
    },
    {
      accessorKey: "validity",
      header: "Validity",
      cell: ({ row }) => (
        <span>
          {row?.original?.validity
            ? moment(row?.original?.validity).format("DD-MM-YYYY")
            : ""}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-0 mt-5 space-y-5">
      {isError && errorMessage && (
        <Alert className="my-2 border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle className="text-sm">{errorMessage}</AlertTitle>
        </Alert>
      )}
      <SectionCards data={data ?? undefined} />
      <Card>
        <CardHeader className="text-center font-bold text-lg">
          Todays Punch History (latest 15)
        </CardHeader>
        <CardContent>
          <ClientSideTable
            columns={columns}
            data={data?.last15Data ?? []}
            isLoading={isLoading}
            buttons={
              <Button asChild>
                <Link href={"/reports"}>
                  See Full Reports
                  <ArrowRight />
                </Link>
              </Button>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
