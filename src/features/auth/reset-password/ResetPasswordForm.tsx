/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useResetPasswordMutation } from "@/stores/features/authSLice";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "./schema";

export default function ResetPasswordForm({
  token,
}: {
  token: string | undefined;
}) {
  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading, isSuccess, isError, error, data }] =
    useResetPasswordMutation();

  const errorMessage = (error as any)?.data
    ? (error as any)?.data?.message
    : "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token ?? "",
      newPassword: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (form_data: TResetPasswordSchema) => {
    try {
      console.log("Form submitted:", form_data);
      await resetPassword(form_data).unwrap();
    } catch (error: unknown) {
      console.log("error", error);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-5 text-center">
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="text-sm text-green-700">{data?.message}</p>
        </div>

        <Link
          href="/login"
          className="inline-block text-sm font-semibold text-black hover:underline"
        >
          Continue to Login
        </Link>
      </div>
    );
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
        className="space-y-5"
        id="post-form"
      >
        <input type="hidden" name="token" value={token ?? ""} />

        <Field data-invalid={!!errors.newPassword}>
          <FieldLabel htmlFor="newPassword">
            Password<i className="text-destructive">*</i>
          </FieldLabel>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              {...register("newPassword")}
              disabled={isLoading}
              aria-invalid={!!errors.newPassword}
              placeholder="Enter your password"
              autoComplete="new-password"
              className="h-12 rounded-full pl-4 pr-12"
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

        {/* Confirm Password Field */}
        <Field data-invalid={!!errors.password_confirmation}>
          <FieldLabel htmlFor="password_confirmation">
            Confirm Password<i className="text-destructive">*</i>
          </FieldLabel>
          <div className="relative">
            <Input
              id="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              {...register("password_confirmation")}
              disabled={isLoading}
              aria-invalid={!!errors.password_confirmation}
              placeholder="Confirm your password"
              autoComplete="new-password"
              className="h-12 rounded-full pl-4 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
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
          disabled={isLoading}
          className="h-12 w-full rounded-full bg-[#0F52BA] text-base font-medium text-white hover:bg-[#0F52BA]/90"
        >
          {isLoading && <Spinner />}
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>

        <div className="text-center text-sm text-gray-500">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-bold text-black hover:underline dark:text-white"
          >
            Login
          </Link>
        </div>
      </form>
    </>
  );
}
