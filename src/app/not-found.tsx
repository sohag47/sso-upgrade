import { Button } from "@/components/ui/button";

import { FileQuestion, MoveLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-background px-4 text-center sm:px-6 lg:px-8">
      <div className="flex max-w-md flex-col items-center justify-center space-y-6">
        {/* Icon Container */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted/50">
          <FileQuestion className="h-12 w-12 text-muted-foreground" />
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl">
            404
          </h1>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Page not found
          </h2>
          <p className="text-muted-foreground text-pretty">
            {`Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or is temporarily unavailable.`}
          </p>
        </div>

        {/* Action Button */}
        <Button asChild className="mt-6" size="lg">
          <Link href="/">
            <MoveLeft className="mr-2 h-4 w-4" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
