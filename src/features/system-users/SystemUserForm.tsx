/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  useCreateSystemUsersMutation,
  useUpdateSystemUsersMutation,
} from "@/stores/features/user-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getSystemUserSchema } from "./schema";

type TSystemUserFormProps = {
  item?: TSystemUser;
  onClose: () => void;
};
export default function SystemUserForm({
  item,
  onClose,
}: TSystemUserFormProps) {
  const [createSystemUsers, insert_item] = useCreateSystemUsersMutation();
  const [updateSystemUsers, update_item] = useUpdateSystemUsersMutation();

  const isEditing = Boolean(item?.id);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TSystemUserSchema>({
    resolver: zodResolver(getSystemUserSchema(isEditing)),
    defaultValues: {
      userName: item?.userName ?? "",
      email: item?.email ?? "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (form_data: TSystemUserSchema) => {
    const isEditing = Boolean(item?.id);

    try {
      const response = isEditing
        ? await updateSystemUsers({
            id: item!.id,
            userName: form_data?.userName,
            email: form_data?.email,
          }).unwrap()
        : await createSystemUsers(form_data).unwrap();

      toast.success(response?.message ?? "Successfully added");
      onClose();
    } catch (error: any) {
      toast.error(error?.data || "An unexpected error occurred");
    }
  };

  if (insert_item?.isLoading || update_item?.isLoading) {
    return <Spinner />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="post-form"
      className="space-y-2"
    >
      <div className="space-y-2">
        <Field data-invalid={!!errors.userName}>
          <FieldLabel htmlFor="userName">
            Username<i className="text-destructive">*</i>
          </FieldLabel>
          <Input
            id="userName"
            {...register("userName")}
            aria-invalid={!!errors.userName}
            placeholder="Enter username"
            autoComplete="username"
          />
          {errors.userName && (
            <FieldError>{errors.userName.message}</FieldError>
          )}
        </Field>

        {/* Email Field */}
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">
            Email<i className="text-destructive">*</i>
          </FieldLabel>
          <Input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={!!errors.email}
            placeholder="Enter email"
            autoComplete="email"
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        {/* Password Field */}
        {!isEditing && (
          <>
            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">
                Password<i className="text-destructive">*</i>
              </FieldLabel>
              <Input
                id="password"
                type="password"
                {...register("password")}
                aria-invalid={!!errors.password}
                placeholder="Enter password"
              />
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>
            <Field data-invalid={!!errors.password_confirmation}>
              <FieldLabel htmlFor="password_confirmation">
                Confirm Password<i className="text-destructive">*</i>
              </FieldLabel>
              <Input
                id="password_confirmation"
                type="password"
                {...register("password_confirmation")}
                aria-invalid={!!errors.password_confirmation}
                placeholder="Enter confirm password"
              />
              {errors.password_confirmation && (
                <FieldError>{errors.password_confirmation.message}</FieldError>
              )}
            </Field>
          </>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="reset" variant={"destructive"} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant={"default"}>
          Submit
        </Button>
      </div>
    </form>
  );
}
