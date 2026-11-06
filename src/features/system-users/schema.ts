import { z } from "zod";

export const getSystemUserSchema = (isEditing: boolean) =>
  z
    .object({
      userName: z
        .string()
        .min(1, "Username is required")
        .min(3, "Username must be at least 3 characters"),
      email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
      password: isEditing
        ? z
            .string()
            .optional()
            .refine(
              (val) => !val || val.length >= 6,
              "Password must be at least 6 characters",
            )
        : z
            .string()
            .min(1, "Password is required")
            .min(6, "Password must be at least 6 characters"),
      password_confirmation: isEditing
        ? z.string().optional()
        : z.string().min(1, "Password confirmation is required"),
    })
    .refine(
      (data) => {
        if (isEditing) return true;
        return data.password === data.password_confirmation;
      },
      {
        message: "Passwords do not match",
        path: ["password_confirmation"],
      },
    );

declare global {
  export type TSystemUserSchema = z.infer<
    ReturnType<typeof getSystemUserSchema>
  >;
  type TSystemUserUpdateSchema = Omit<
    TSystemUserSchema,
    "password" | "password_confirmation"
  > & {
    id: number;
  };
}
