import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(255, "Email must not exceed 255 characters");

export const passwordSchema = z.string().min(1, "Password is required");
export const newPasswordSchema = z
  .string()
  .min(1, "New password is required")
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must not exceed 128 characters");
