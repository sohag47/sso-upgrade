"use client";

import {Skeleton} from "./ui/skeleton";

export default function SkeletonForm() {
  return (
    <div className="flex w-full max-w-xs cursor-wait flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-row items-center justify-end gap-3">
        <Skeleton className="h-8 w-24 bg-destructive/10" />
        <Skeleton className="h-8 w-24 bg-primary/10" />
      </div>
    </div>
  );
}
