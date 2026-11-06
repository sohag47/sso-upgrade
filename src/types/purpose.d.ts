type TPurpose = {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type TPurposeFormState<T> = {
  success: boolean;
  message: string;
  data?: T | null;
  // Zod's flatten().fieldErrors returns Record<string, string[]>
  errors?: Record<string, string[]>;
  // We keep track of values so the input doesn't clear if validation fails
  values: {Id?: string | undefined; Name: string};
};

type PurposeFormProps = {
  item?: {Id: string; Name: string};
  onClose: () => void;
};
type PurposeListProps = {
  data: TPurpose[];
};
