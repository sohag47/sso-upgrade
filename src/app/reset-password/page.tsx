import ResetPasswordForm from "@/features/auth/reset-password/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : undefined;

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-100 flex flex-col gap-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight light:text-black dark:text-white uppercase">
              Reset Password
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Create a new password for your account.
            </p>
          </div>

          <ResetPasswordForm token={token} />
        </div>
      </div>
    </div>
  );
}
