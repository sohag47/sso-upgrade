"use client";

import AlertMessage from "@/components/alert-message";
import ClientSideTable from "@/components/data-tables/client-side-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialog } from "@/hooks/useDialog";
import {
  useDeleteSystemUsersMutation,
  useGetSystemUsersQuery,
} from "@/stores/features/user-slice";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import SystemUserForm from "./SystemUserForm";

export default function SystemUserList({ params }: TUserListProps) {
  const pageIndex = params?.page ?? 1;
  const pageSize = params?.size ?? 15;

  const { isLoading, data, isError, error } = useGetSystemUsersQuery();
  const [deleteSystemUsers, delete_item] = useDeleteSystemUsersMutation();
  console.log("isLoading", isLoading);
  const [item, setItem] = useState<TSystemUser>();
  const { isOpen, handleDialog, dialogProps } = useDialog();

  const handleEdit = (tableRow: TSystemUser) => {
    setItem(tableRow);
    handleDialog(true);
  };

  const handleCreate = () => {
    setItem(undefined);
    handleDialog(true);
  };
  const onClose = () => {
    handleDialog(false);
  };
  const confirmDelete = (userId: number) => {
    toast.info(`Delete user?`, {
      description: "This action cannot be undone.",
      duration: 8000,
      action: {
        label: "Yes",
        onClick: async () => {
          try {
            await deleteSystemUsers({
              id: userId,
            }).unwrap();
            toast.success("User deleted successfully!");
          } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete user");
          }
        },
      },
      cancel: {
        label: "No",
        onClick: () => {
          toast.dismiss();
        },
      },
    });
  };

  const columns: ColumnDef<TSystemUser>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: ({ row }) => row.index + 1 + (pageIndex - 1) * pageSize,
    },
    {
      accessorKey: "userName",
      header: "Username",
      cell: ({ row }) => row.getValue("userName"),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="whitespace-break-spaces">{row.getValue("email")}</span>
      ),
    },
    {
      accessorKey: "action",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleEdit(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => confirmDelete(row.original?.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="m-1">
      {isError && error && (
        <section className="py-1 px-2">
          <AlertMessage response={error ?? undefined} />
        </section>
      )}

      <ClientSideTable
        columns={columns}
        data={data ?? []}
        isLoading={isLoading || delete_item?.isLoading}
        buttons={<Button onClick={handleCreate}>Create a new</Button>}
      />

      <Dialog {...dialogProps}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {item ? "Edit User Profile" : "Create System User"}
            </DialogTitle>
            <DialogDescription>
              {item
                ? "Make changes to user profile here. Click save when done."
                : "Enter details to create a new system user."}
            </DialogDescription>
          </DialogHeader>

          <SystemUserForm item={item} onClose={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
