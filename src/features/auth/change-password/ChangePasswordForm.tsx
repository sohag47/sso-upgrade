/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { logoutAction } from "@/actions/auth.action";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useChangePasswordMutation } from "@/stores/features/authSLice";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, Eye, EyeOff } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { changePasswordSchema } from "./schema";

export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [changePassword, { isLoading, isError, error }] =
    useChangePasswordMutation();

  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        await logoutAction();
      } catch (error) {
        console.error("Logout process failed:", error);
      }
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (form_data: TChangePasswordFormValues) => {
    try {
      console.log("Form submitted:", form_data);
      const response = await changePassword(form_data).unwrap();
      if (response) {
        toast.success(response?.message ?? "Successfully added");
        handleLogout();
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error((error as any)?.message ?? "Successfully added");
    }
  };

  const errorMessage = (error as any)?.data
    ? (error as any)?.data?.message
    : "";

  if (isPending && isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {isError && errorMessage && (
        <Alert className="my-2 border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle className="text-sm">{errorMessage}</AlertTitle>
        </Alert>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        id="change-password-form"
      >
        <Field data-invalid={!!errors.currentPassword}>
          <FieldLabel htmlFor="password">
            Current Password<i className="text-destructive">*</i>
          </FieldLabel>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("currentPassword")}
              aria-invalid={!!errors.currentPassword}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="h-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <FieldError>{errors.currentPassword.message}</FieldError>
          )}
        </Field>
        <Field data-invalid={!!errors.newPassword}>
          <FieldLabel htmlFor="newPassword">
            New Password<i className="text-destructive">*</i>
          </FieldLabel>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              {...register("newPassword")}
              aria-invalid={!!errors.newPassword}
              placeholder="Enter your new password"
              className="h-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <FieldError>{errors.newPassword.message}</FieldError>
          )}
        </Field>
        <Field data-invalid={!!errors.password_confirmation}>
          <FieldLabel htmlFor="password_confirmation">
            New Password<i className="text-destructive">*</i>
          </FieldLabel>
          <div className="relative">
            <Input
              id="password_confirmation"
              type={showPassword ? "text" : "password"}
              {...register("password_confirmation")}
              aria-invalid={!!errors.password_confirmation}
              placeholder="Enter your confirm password"
              className="h-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password_confirmation && (
            <FieldError>{errors.password_confirmation.message}</FieldError>
          )}
        </Field>

        <Button
          type="submit"
          className="mt-2 h-11 w-full rounded-lg font-medium text-sm transition-all"
        >
          Submit
        </Button>
      </form>
    </>
  );
}
