"use client";

import ServerSideTable from "@/components/data-tables/server-side-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  useGetReportQuery,
  useLazyGetReportQuery,
} from "@/stores/features/user-slice";
import { ColumnOption, exportToExcel } from "@/utils/export-to-excel";
import { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";

export default function ReportList({
  params,
}: {
  params: TReportFilterQueryParams;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cleanParams = Object.fromEntries(
    Object.entries(params ?? {}).filter(
      ([_, value]) => value !== undefined && value !== null && value !== "",
    ),
  );
  const { isLoading, data } = useGetReportQuery({
    page: cleanParams.page ? Number(cleanParams.page) : 1,
    size: cleanParams.size ? Number(cleanParams.size) : 15,
    ...cleanParams,
  });
  const [loadAllTrigger, load_response] = useLazyGetReportQuery();
  const listData = data?.data ?? [];
  const totalCount = data?.totalRecords ?? 0;

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentPageSize = Number(searchParams.get("size")) || 15;

  const columns: ColumnDef<TReport>[] = [
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
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <span>
          {row?.original?.date
            ? moment(row?.original?.date).format("DD-MM-YYYY")
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

  const studentColumns: ColumnOption<TReport>[] = [
    { header: "Student ID", key: "studentIdNo", width: 18 },
    { header: "Full Name", key: "name", width: 22 },
    { header: "Type", key: "type", width: 25 },
    { header: "Department", key: "department", width: 25 },
    { header: "Office", key: "office", width: 25 },
    {
      header: "In Time",
      key: "inTime",
      width: 22,
      formatter: (val) =>
        val ? moment(val, "HH:mm:ss").format("hh:mm A") : "-",
    },
    {
      header: "Out Time",
      key: "outTime",
      width: 22,
      formatter: (val) =>
        val ? moment(val, "HH:mm:ss").format("hh:mm A") : "-",
    },
    {
      header: "Date",
      key: "date",
      width: 22,
      formatter: (val) => (val ? moment(val).format("DD-MM-YYYY") : "-"),
    },
    { header: "RFID", key: "rfid", width: 15 },
    {
      header: "Validity",
      key: "validity",
      width: 15,
      formatter: (val) => (val ? moment(val).format("DD-MM-YYYY") : "-"),
    },
  ];

  const handlePageChange = (nextPage: number, nextSize: number) => {
    console.log("nextSize", nextSize);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", nextPage.toString());
    params.set("size", nextSize.toString());
    router.push(`?${params.toString()}`);
  };

  const handleExport = async () => {
    try {
      const response = await loadAllTrigger({
        ...cleanParams,
        size: data?.totalPages,
      }).unwrap();

      exportToExcel({
        data: response?.data ?? response ?? [],
        columns: studentColumns,
        fileName: "Student_Logs",
        sheetName: "Attendance Records",
      });
    } catch (error) {
      console.error("Failed to export report:", error);
    }
  };

  return (
    <div className="pb-5">
      <ServerSideTable
        columns={columns}
        isLoading={isLoading}
        data={listData ?? []}
        serverSide={true}
        totalCount={totalCount}
        controlledPageIndex={currentPage}
        controlledPageSize={currentPageSize}
        onPageChange={handlePageChange}
        searchPlaceholder="Search visitors..."
        buttons={
          <Button
            onClick={handleExport}
            variant={"default"}
            disabled={load_response.isLoading}
          >
            <Download />
            Export to Excel (.xlsx)
            {load_response.isLoading && <Spinner />}
          </Button>
        }
      />
    </div>
  );
}
