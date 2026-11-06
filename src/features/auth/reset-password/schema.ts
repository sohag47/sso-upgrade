import { newPasswordSchema } from "@/schema/reusable.schema";
import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    token: z.string().trim().min(1, "Reset token is required"),
    newPassword: newPasswordSchema,
    password_confirmation: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });

declare global {
  type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
}
