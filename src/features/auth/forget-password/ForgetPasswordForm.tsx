/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSubmitForgotPasswordMutation } from "@/stores/features/authSLice";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema } from "./schema";

export default function ForgetPasswordForm() {
  const [submitForgotPassword, { isLoading, isSuccess, isError, error, data }] =
    useSubmitForgotPasswordMutation();
  console.log("data", data);

  const errorMessage = (error as any)?.data
    ? (error as any)?.data?.message
    : "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (form_data: TForgotPasswordFormValues) => {
    try {
      console.log("Form submitted:", form_data);
      await submitForgotPassword(form_data).unwrap();
      reset();
    } catch (error: unknown) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-100 flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight light:text-black dark:text-white uppercase">
            Forgot Password?
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-white">
            {`Enter your email address and we'll send you a password reset link.`}
          </p>
        </div>
        {isError && errorMessage && (
          <Alert className="my-2 border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle className="text-sm">{errorMessage}</AlertTitle>
          </Alert>
        )}
        {isSuccess && data?.message && (
          <Alert className="my-2 border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle className="text-sm">{data?.message}</AlertTitle>
          </Alert>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          id="post-form"
        >
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">
              Email <i className="text-destructive">*</i>
            </FieldLabel>
            <Input
              id="email"
              {...register("email")}
              disabled={isLoading}
              aria-invalid={!!errors.email}
              placeholder="Enter email"
              autoComplete="on"
              className="h-12 rounded-full pl-4 pr-10"
            />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </Field>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full rounded-full bg-[#0F52BA] hover:bg-[#0F52BA]/90 text-white font-medium text-base"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>

          <div className="text-center text-sm text-gray-500 dark:text-white">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-bold text-black hover:underline dark:text-white"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
