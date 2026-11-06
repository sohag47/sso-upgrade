import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Clock, Fingerprint, IdCard, Users } from "lucide-react";

export function SectionCards({ data }: { data?: TDashboard }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
      <Card className="relative overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardDescription className="text-sm font-medium text-muted-foreground">
            Total Unique User punch
          </CardDescription>
          <div className="rounded-xl bg-blue-500/10 p-2 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            <Fingerprint className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tabular-nums text-foreground">
            {data?.totalUniquePunch ?? "0"}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Unique entries recorded
          </p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardDescription className="text-sm font-medium text-muted-foreground">
            Total Punch
          </CardDescription>
          <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
            <Clock className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tabular-nums text-foreground">
            {data?.totalPunch ?? "0"}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Overall punch volume
          </p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardDescription className="text-sm font-medium text-muted-foreground">
            Active RFID Card
          </CardDescription>
          <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            <IdCard className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tabular-nums text-foreground">
            {data?.totalActiveRfidCard ?? "0"}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Currently engaged
          </p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardDescription className="text-sm font-medium text-muted-foreground">
            Total Users
          </CardDescription>
          <div className="rounded-xl bg-violet-500/10 p-2 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400">
            <Users className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tabular-nums text-foreground">
            {data?.totalUser ?? "0"}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Registered accounts
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
