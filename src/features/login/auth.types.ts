export interface LoginResponse {
  email: string;
  token?: string;
}

export interface ApiErrorResponse {
  data?: {
    message?: string;
  };
}
