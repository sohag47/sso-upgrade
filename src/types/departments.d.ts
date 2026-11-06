type TDepartment = {
  id: string;
  company_id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  status: "Active" | "Disabled" | "Deleted";
  createdAt: string;
  updatedAt: string;
};
type TDepartments = TDepartment[];

type TDepartmentFormState<T> = {
  success: boolean;
  message: string;
  data?: T | null;
  errors?: Record<string, string[]>;
  values: {Id?: string | undefined; Name: string};
};

type TDepartmentFormProps = {
  item?: {id: string; name: string};
  onClose: () => void;
};

type TDepartmentListProps = {
  data: TDepartments;
};
type TDepartmentMutationPayload = {
  Name: string;
};
type TDepartmentResponse<T> = Promise<TResponse<T>>;
