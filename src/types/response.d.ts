type TRequestMetadata = {
  code: number;
  statusText: string;
  url: string;
};

type ApiError = {
  type?: string;
  title?: string;
  status?: number;
  errors?: Record<string, string[]>;
  traceId?: string;
};

type TPagination<T> = {
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  data: T[];
};

type TResponse<T> = {
  status: boolean;
  message: string;
  data?: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  meta?: TRequestMetadata;
};

type TResponseErrorPayload = {
  status: boolean;
  message?: string;
  error?: ApiError | string;
  meta?: TRequestMetadata;
};

type TPaginationResponse<T> = {
  success: boolean;
  message: string;
  data?: TPagination<T>;
  error?: unknown;
};
