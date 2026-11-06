import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import SystemUserList from "@/features/system-users/SystemUserList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Users",
};

export default async function Users({ searchParams }: PageProps) {
  const params = await searchParams;

  const breadcrumbs: TBreadcrumb[] = [{ sl: 1, label: "System Users" }];

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} title="System User List" />

      <Card className="m-1">
        <CardContent className="space-y-2">
          <SystemUserList params={params} />
        </CardContent>
      </Card>
    </div>
  );
}
