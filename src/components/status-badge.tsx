import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Icon } from "@tabler/icons-react";
import {
  IconBan,
  IconCircleCheck,
  IconCircleDashed,
  IconClock,
  IconLock,
  IconTrash,
} from "@tabler/icons-react";

type Status = "active" | "disabled" | "blocked" | "deleted" | "pending";

const statusStyles: Record<Status, string> = {
  active: "border-green-500/50 text-green-600 bg-green-50 dark:bg-green-950/30",
  disabled: "border-gray-400/50 text-gray-500 bg-gray-50 dark:bg-gray-900/30",
  blocked:
    "border-orange-500/50 text-orange-600 bg-orange-50 dark:bg-orange-950/30",
  deleted: "border-red-500/50 text-red-600 bg-red-50 dark:bg-red-950/30",
  pending:
    "border-yellow-500/50 text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30",
};

const statusIcons: Record<Status, Icon> = {
  active: IconCircleCheck,
  disabled: IconBan,
  blocked: IconLock,
  deleted: IconTrash,
  pending: IconClock,
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const key = status.toLowerCase() as Status;
  const IconComponent = statusIcons[key] ?? IconCircleDashed;
  const style =
    statusStyles[key] ?? "border-muted-foreground/30 text-muted-foreground";

  return (
    <Badge
      variant="outline"
      className={cn("capitalize gap-1.5 [&>svg]:size-3.5", style, className)}
    >
      <IconComponent />
      {status}
    </Badge>
  );
}
