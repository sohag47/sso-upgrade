type TUserList = {
  name: string;
  studentIdNo: string;
  department: string;
  office: string;
  validity: string;
  type: TFilterType;
};

type TUserStatus = "active" | "disabled" | "blocked" | "deleted" | "pending";
type TUserListData = {
  page: number;
  size: number;
  search: string;
  status: TUserStatus;
  sort_by: string;
  direction: boolean;
};
type TSearchParams = {
  page: number;
  size: number;

  type: TFilterType;
  dept: string;
  office: string;
  studentIdNo: string;
  rfid: string;
};
type TQueryParams = Partial<TSearchParams>;
type PageProps = {
  searchParams: Promise<TQueryParams>;
};

type TUserListProps = {
  params: TQueryParams;
};

type TQueryParams = {
  page: number;
  size: number;
  status: TUserStatus;
  search?: string;
  sort_by?: string;
  direction?: boolean;
};
