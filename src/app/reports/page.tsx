import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { ReportFilters } from "@/features/reports/ReportFilters";
import ReportList from "@/features/reports/ReportList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports",
};

export default async function Reports({ searchParams }: TReportPageProps) {
  const params = await searchParams;

  const getSingleParam = (value?: string | string[]) =>
    Array.isArray(value) ? value[0] : value;

  const filters: TSearchFilterParams = {
    fromDate: getSingleParam(params.fromDate),
    toDate: getSingleParam(params.toDate),
    type: getSingleParam(params.type),
    dept: getSingleParam(params.dept),
    office: getSingleParam(params.office),
    studentIdNo: getSingleParam(params.studentIdNo),
    rfid: getSingleParam(params.rfid),
  };

  const breadcrumbs: TBreadcrumb[] = [{ sl: 1, label: "Reports" }];

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} title="Punch Reports" />

      <Card className="m-1">
        <CardContent className="space-y-2">
          <ReportFilters filters={filters} />

          <ReportList params={params} />
        </CardContent>
      </Card>
    </div>
  );
}
