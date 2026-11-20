import { loginSchema } from "@/features/login";
import { describe, expect, it } from "vitest";

describe("loginSchema", () => {
  it("passes when userName and password are provided", () => {
    const result = loginSchema.safeParse({
      userName: "sohag",
      password: "secret123",
    });
    expect(result.success).toBe(true);
  });

  it("fails with expected messages when fields are empty", () => {
    const result = loginSchema.safeParse({
      userName: "",
      password: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      expect(fieldErrors.userName).toContain("username is required");
      expect(fieldErrors.password).toContain("Password is required");
    }
  });
});
