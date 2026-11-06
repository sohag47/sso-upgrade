import { newPasswordSchema } from "@/schema/reusable.schema";
import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Password is required"),
    newPassword: newPasswordSchema,
    password_confirmation: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    path: ["password"],
    message: "New password must be different from current password",
  });

declare global {
  type TChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
}
