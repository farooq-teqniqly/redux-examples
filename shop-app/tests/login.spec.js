import { test, expect } from "@playwright/test";

const user = "emilys";
const password = "emilyspass";

test.describe("Login Flow", () => {
  // Before each test, navigate to home page and ensure login form is loaded
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("form");
  });

  test("should display login form", async ({ page }) => {
    // Test initial login form rendering:
    // 1. Verify login heading is visible
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

    // 2. Verify all form elements are present and visible
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("should show error message on invalid credentials", async ({ page }) => {
    // Test error handling for invalid login:
    // 1. Fill in invalid credentials
    await page.getByPlaceholder("Username").fill("invalid_user");
    await page.getByPlaceholder("Password").fill("wrong_password");

    // 2. Submit form
    await page.getByRole("button", { name: "Login" }).click();

    // 3. Verify error message appears
    await expect(page.getByText(/error|invalid/i)).toBeVisible();
  });

  test("should login successfully and redirect to categories", async ({ page }) => {
    // Test successful login flow:
    // 1. Fill in valid credentials
    await page.getByPlaceholder("Username").fill(user);
    await page.getByPlaceholder("Password").fill(password);

    // 2. Submit login form
    await page.getByRole("button", { name: "Login" }).click();

    // 3. Verify redirect to categories page after successful login
    await expect(page).toHaveURL(/.*\/categories/);
  });

  test("should show loading state during login", async ({ page }) => {
    // Test loading state indication:
    // 1. Fill in valid credentials
    await page.getByPlaceholder("Username").fill(user);
    await page.getByPlaceholder("Password").fill(password);

    // 2. Submit login form
    await page.getByRole("button", { name: "Login" }).click();

    // 3. Verify loading state is shown while request is in progress
    await expect(page.getByRole("button", { name: "Logging in..." })).toBeVisible();
  });
});
