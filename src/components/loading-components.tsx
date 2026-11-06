import { Loader2 } from "lucide-react";

export default function LoadingComponents() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-background px-4 text-center sm:px-6 lg:px-8">
      <div className="flex max-w-md flex-col items-center justify-center space-y-6">
        {/* Spinner Container */}
        <div className="flex items-center justify-center rounded-full bg-muted/50 p-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Loading...
          </h2>
          <p className="animate-pulse text-muted-foreground text-pretty">
            Please wait while we prepare your content.
          </p>
        </div>
      </div>
    </div>
  );
}
