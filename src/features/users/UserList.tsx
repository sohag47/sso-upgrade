"use client";

import AlertMessage from "@/components/alert-message";
import ServerSideTable from "@/components/data-tables/server-side-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  useGetUsersQuery,
  useSyncDataMutation,
} from "@/stores/features/user-slice";
import { removeEmptyKeys } from "@/utils/removeEmptyKeys";
import { ColumnDef } from "@tanstack/react-table";
import { CloudSync } from "lucide-react";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function UserList({ params }: TUserListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageIndex = params?.page ?? 1;
  const pageSize = params?.size ?? 15;

  const queryParams = removeEmptyKeys({
    page: params?.page ?? 1,
    size: params?.size ?? 15,
    type: params?.type,
    dept: params?.dept,
    office: params?.office,
    studentIdNo: params?.studentIdNo,
    rfid: params?.rfid,
  });

  const { isLoading, data, isError, error } = useGetUsersQuery(queryParams);
  const totalCount = data?.totalRecords ?? 0;
  console.log("isLoading", isLoading);

  const [syncData, syncResponse] = useSyncDataMutation();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentPageSize = Number(searchParams.get("size")) || 15;
  const urlSearch = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(urlSearch);

  const handlePageChange = (nextPage: number, nextSize: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", nextPage.toString());
    params.set("size", nextSize.toString());
    router.push(`?${params.toString()}`);
  };

  const columns: ColumnDef<TUserList>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: ({ row }) => row.index + 1 + (pageIndex - 1) * pageSize,
    },
    {
      accessorKey: "studentIdNo",
      header: "Student Id",
      cell: ({ row }) => row.getValue("studentIdNo"),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="whitespace-break-spaces">{row.getValue("name")}</span>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => (
        <span className="whitespace-break-spaces">
          {row.getValue("department")}
        </span>
      ),
    },
    {
      accessorKey: "office",
      header: "Office",
      cell: ({ row }) => (
        <span className="whitespace-break-spaces">
          {row.getValue("office")}
        </span>
      ),
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

  function handleSync() {
    toast.promise(syncData().unwrap(), {
      loading: "Syncing data…",
      success: (data: { success: boolean; syncedCount: number }) =>
        `Synced ${data.syncedCount} item${data.syncedCount === 1 ? "" : "s"}.`,
      error: "Could not sync data.",
    });
  }

  return (
    <div className="m-1">
      {isError && error && (
        <section className="py-1 px-2">
          <AlertMessage response={error ?? undefined} />
        </section>
      )}

      <ServerSideTable
        columns={columns}
        serverSide
        data={data?.data ?? []}
        totalCount={totalCount}
        controlledPageIndex={currentPage}
        controlledPageSize={currentPageSize}
        onPageChange={handlePageChange}
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        searchPlaceholder="Search visitors..."
        isLoading={isLoading}
        buttons={
          <Button
            variant="default"
            onClick={handleSync}
            disabled={syncResponse.isLoading}
          >
            <CloudSync />
            Sync Data
            {syncResponse.isLoading && <Spinner />}
          </Button>
        }
      />
    </div>
  );
}
