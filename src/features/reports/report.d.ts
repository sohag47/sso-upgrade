type TReport = {
  id: number;
  Name: string;
  StudentIdNo: string;
  dept: string;
  inTime: string;
  outTime: string;
  rfid: string;
  validity: Date;
  type: string;
  date: string;
};

type ReportListProps = {
  data?: TReport[];
  totalCount?: number;
};

type TGetReportList = {
  page: number;
  pageSize: number;
  search?: string;
};

type TReportQueryParams = {
  page: string;
  size: string;

  fromDate: string;
  toDate: string;
  dept: string;
  studentIdNo: string;
  rfid: string;
  departments: string;
  offices: string;
};
type TReportFilterQueryParams = Partial<{
  page: string;
  size: string;

  fromDate: string;
  toDate: string;
  type: string;
  dept: string;
  office: string;
  studentIdNo: string;
  rfid: string;
}>;

type TSearchFilterParams = Omit<TReportFilterQueryParams, "page" | "size">;

interface TReportPageProps {
  searchParams: Promise<TReportFilterQueryParams>;
}
