type TAuthActionState<T extends Record<string, unknown>> = {
  success: boolean;
  message?: string;
  errors?: Partial<Record<keyof T | "_form", string[]>>;
  values?: Partial<T>;
};
