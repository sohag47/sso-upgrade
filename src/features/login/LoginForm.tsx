"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { setAuth } from "@/stores/shared/sharedSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { LoginFormValues, loginSchema } from "./login.schema";
import { ApiErrorResponse } from "./auth.types";
import { useSubmitLoginMutation } from "@/stores/features/authSLice";

export function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitLogin, { isLoading, isError, error }] = useSubmitLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = async (formData: LoginFormValues) => {
    try {
      const response = await submitLogin(formData).unwrap();
      if (response) {
        dispatch(setAuth({ email: response.email }));
        router.refresh();
        router.push("/");
      }
    } catch {
      // Handled via RTK Query isError / error state
    }
  };

  const errorMessage = (error as ApiErrorResponse | undefined)?.data?.message ?? "";

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-100 flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight light:text-black dark:text-white uppercase">
            Login
          </h1>
        </div>

        {isError && errorMessage && (
          <Alert className="my-2 border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle className="text-sm">{errorMessage}</AlertTitle>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} id="post-form" className="space-y-5" noValidate>
          <Field data-invalid={!!errors.userName}>
            <FieldLabel htmlFor="userName">
              Username<i className="text-destructive">*</i>
            </FieldLabel>
            <Input
              id="userName"
              {...register("userName")}
              disabled={isLoading}
              aria-invalid={!!errors.userName}
              placeholder="Enter username"
              autoComplete="on"
              className="h-12 rounded-full pl-4 pr-10"
            />
            {errors.userName && <FieldError>{errors.userName.message}</FieldError>}
          </Field>

          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password">
              Password<i className="text-destructive">*</i>
            </FieldLabel>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                disabled={isLoading}
                aria-invalid={!!errors.password}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="h-12 rounded-full pl-4 pr-12"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <FieldError>{errors.password.message}</FieldError>}
          </Field>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                className="border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <Label
                htmlFor="remember"
                className="text-sm font-medium text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
              >
                Remember me
              </Label>
            </div>
            <Link
              href="/forget-password"
              className="text-sm font-medium text-gray-600 hover:text-black hover:underline underline-offset-2 dark:text-white"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 h-12 w-full rounded-full bg-[#0F52BA] hover:bg-[#0F52BA]/90 text-white font-medium text-base"
          >
            {isLoading && <Spinner />}
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
