import { test, expect } from "@playwright/test";
import { TEST_CREDENTIALS } from "./test-utilsl";

test.describe("Categories Route Protection", () => {
  const { user, password } = TEST_CREDENTIALS;

  // Before each test, navigate to the home page and wait for the login form to be visible
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("form");
  });

  test("should redirect to login when accessing /categories without authentication", async ({
    page,
  }) => {
    // Test protection of /categories route:
    // 1. Try to access /categories directly without being logged in
    await page.goto("/categories");

    // 2. Wait for redirect to login page and verify login heading is visible
    await page.waitForSelector('h2:has-text("Login")');
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("should allow access to /categories when authenticated", async ({ page }) => {
    // Test successful access to protected route:
    // 1. Fill in login credentials
    await page.getByPlaceholder("Username").fill(user);
    await page.getByPlaceholder("Password").fill(password);

    // 2. Submit login form
    await page.getByRole("button", { name: "Login" }).click();

    // 3. Verify successful redirect to /categories after login
    await expect(page).toHaveURL(/.*\/categories/);
  });

  test("should redirect to login after logout", async ({ page }) => {
    // Test logout functionality:
    // 1. Login with valid credentials
    await page.getByPlaceholder("Username").fill(user);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();

    // 2. Verify successful login by checking URL
    await expect(page).toHaveURL(/.*\/categories/);

    // 3. Simulate logout by removing access token and refreshing page
    await page.evaluate(() => {
      localStorage.removeItem("accessToken");
      window.location.reload();
    });

    // 4. Verify redirect to login page after logout
    await page.waitForSelector('h2:has-text("Login")');
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });
});
