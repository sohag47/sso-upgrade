import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import UserList from "@/features/users/UserList";
import { UserListFilters } from "@/features/users/UserListFilters";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
};

export default async function Users({ searchParams }: PageProps) {
  const params = await searchParams;

  const breadcrumbs: TBreadcrumb[] = [{ sl: 1, label: "Access Users" }];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} title="Access User List" />
      <section className="mx-5">
        <Card>
          <CardContent className="mb-5">
            <UserListFilters params={params} />
            <UserList params={params} />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
