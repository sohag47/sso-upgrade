import { z } from "zod";
export const loginSchema = z.object({
  userName: z.string().nonempty("username is required"),
  password: z.string().nonempty("Password is required"),
});

declare global {
  type TLoginSchema = z.infer<typeof loginSchema>;
}
