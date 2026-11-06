import type {VISITOR_STATUS} from "@/enums/visitor.enum";
export type TVisitorStatus = `${VISITOR_STATUS}`;

export type TVisitor = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  categoryId: number;
  category: string;
  status: TVisitorStatus;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
};
export type TVisitorListProps = {
  data?: TPagination<TVisitor>;
};

export type TGetAllVisitors = {
  page: number;
  pageSize: number;
  search?: string;
  status?: TVisitorStatus;
};
