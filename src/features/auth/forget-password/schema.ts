import { emailSchema } from "@/schema/reusable.schema";
import { z } from "zod";

export const forgotPasswordSchema = z.object({ email: emailSchema });

declare global {
  type TForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
}
