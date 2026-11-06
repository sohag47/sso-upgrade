import { Skeleton } from "@/components/ui/skeleton";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export default function SkeletonTable() {
  return (
    <Card className="m-1 cursor-progress">
      <CardHeader>
        <Skeleton className="h-8 w-xs" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex w-full flex-col gap-2">
          {Array.from({ length: 15 }).map((_, index) => (
            <div className="flex gap-4" key={index}>
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20 flex-1" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20 flex-1" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20 flex-1" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div></div>
        <div></div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={true}
          >
            <span className="sr-only">Go to first page</span>
            <IconChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            disabled={true}
          >
            <span className="sr-only">Go to previous page</span>
            <IconChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            disabled={true}
          >
            <span className="sr-only">Go to next page</span>
            <IconChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            disabled={true}
          >
            <span className="sr-only">Go to last page</span>
            <IconChevronsRight />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
