import { test, expect } from "@playwright/test";

const user = "emilys";
const password = "emilyspass";

test.describe("Login Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("form");
  });

  test("should display login form", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("should show error message on invalid credentials", async ({ page }) => {
    await page.getByPlaceholder("Username").fill("invalid_user");
    await page.getByPlaceholder("Password").fill("wrong_password");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText(/error|invalid/i)).toBeVisible();
  });

  test("should login successfully and redirect to categories", async ({ page }) => {
    await page.getByPlaceholder("Username").fill(user);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL(/.*\/categories/);
  });

  test("should show loading state during login", async ({ page }) => {
    await page.getByPlaceholder("Username").fill(user);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByRole("button", { name: "Logging in..." })).toBeVisible();
  });
});
