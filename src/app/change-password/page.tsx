import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChangePasswordForm from "@/features/auth/change-password/ChangePasswordForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Change Password",
};

export default async function ChangePassword() {
  return (
    <>
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-border/60">
          <CardHeader className="space-y-2 text-center pb-1">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Change Password
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Update your password to keep your account secure.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ChangePasswordForm />
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="pt-2  text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground font-medium transition-colors hover:underline"
              >
                Back to Dashboard
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
