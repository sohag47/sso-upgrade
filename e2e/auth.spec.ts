import { test, expect } from "@playwright/test";

test.describe("Authentication E2E", () => {
  test("redirects unauthenticated user from protected route to /login", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole("heading", { name: /login/i })).toBeVisible();
  });

  test("shows error message on invalid credentials", async ({ page }) => {
    await page.route(
      (url) => url.pathname.endsWith("/login") && url.port !== "3000",
      async (route) => {
        await route.fulfill({
          status: 401,
          contentType: "application/json",
          body: JSON.stringify({ message: "Invalid username or password" }),
        });
      },
    );

    await page.goto("/login");

    await page.getByLabel(/username/i).fill("wronguser");
    await page.getByPlaceholder(/enter your password/i).fill("wrongpass");
    await page.getByRole("button", { name: /^login$/i }).click();

    await expect(page.getByText(/invalid username or password/i)).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test("logs in successfully, redirects to /, and persists session on reload", async ({
    page,
    context,
  }) => {
    const mockJwt = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb2hhZyIsImV4cCI6OTk5OTk5OTk5OX0.signature";

    await page.route(
      (url) => url.pathname.endsWith("/login") && url.port !== "3000",
      async (route) => {
        await context.addCookies([
          {
            name: "access_token",
            value: mockJwt,
            domain: "localhost",
            path: "/",
            httpOnly: false,
            sameSite: "Lax",
          },
        ]);

        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            email: "sohag@example.com",
            token: mockJwt,
            access_token: mockJwt,
          }),
        });
      },
    );

    await page.goto("/login");

    await page.getByLabel(/username/i).fill("sohag");
    await page.getByPlaceholder(/enter your password/i).fill("secret123");
    await page.getByRole("button", { name: /^login$/i }).click();

    await expect(page).toHaveURL("/");

    await page.reload();
    await expect(page).toHaveURL("/");
  });

  test("redirects authenticated user from /login to /", async ({ page, context }) => {
    await context.addCookies([
      {
        name: "access_token",
        value: "mock-jwt-token",
        domain: "localhost",
        path: "/",
        httpOnly: false,
        sameSite: "Lax",
      },
    ]);

    await page.goto("/login");
    await expect(page).toHaveURL("/");
  });
});
