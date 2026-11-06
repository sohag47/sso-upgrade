export type TInstitution = {
  id: number;
  name: string;
  address: string;
  website: string;
  email: string;
  phone: string;
  ror_id: number;
};

export type TTInstitutionListProps = {
  data?: TPagination<TInstitution>;
};

export type TGetAllInstitution = {
  page: number;
  pageSize: number;
  search?: string;
};
