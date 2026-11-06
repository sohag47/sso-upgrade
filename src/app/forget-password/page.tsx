import ForgetPasswordForm from "@/features/auth/forget-password/ForgetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password",
};

export default async function ForgetPassword() {
  return (
    <div className="mx-auto w-full max-w-md">
      <ForgetPasswordForm />
    </div>
  );
}
