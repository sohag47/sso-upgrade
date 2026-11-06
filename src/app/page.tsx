import Breadcrumbs from "@/components/layout/Breadcrumbs";
import DashboardCounts from "@/features/dashboard/DashboardCounts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Access Control System",
};

export default async function DashboardPage() {
  const breadcrumbs: TBreadcrumb[] = [];
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} title="Dashboard" />
      <DashboardCounts />
    </div>
  );
}
