"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { MoveLeft, RefreshCcw, ServerCrash } from "lucide-react";
import Link from "next/link";

export default function Error() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-background px-4 text-center sm:px-6 lg:px-8">
      <div className="flex max-w-md flex-col items-center justify-center space-y-6">
        {/* Icon Container */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10">
          <ServerCrash className="h-12 w-12 text-destructive" />
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl">
            500
          </h1>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Internal Server Error
          </h2>
          <p className="text-muted-foreground text-pretty">
            Sorry, something went wrong on our end. Our team has been notified
            and is working to fix the issue. Please try again later.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <MoveLeft className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>

          <Button size="lg" onClick={() => window.location.reload()}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
