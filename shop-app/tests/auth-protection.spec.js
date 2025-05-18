import { test, expect } from "@playwright/test";

const user = "emilys";
const password = "emilyspass";

test.describe("Categories Route Protection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("form");
  });

  test("should redirect to login when accessing /categories without authentication", async ({
    page,
  }) => {
    await page.goto("/categories");
    await page.waitForSelector('h2:has-text("Login")');
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("should allow access to /categories when authenticated", async ({ page }) => {
    await page.getByPlaceholder("Username").fill(user);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL(/.*\/categories/);
  });

  test("should redirect to login after logout", async ({ page }) => {
    await page.getByPlaceholder("Username").fill(user);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/.*\/categories/);

    await page.evaluate(() => {
      localStorage.removeItem("accessToken");
      window.location.reload();
    });

    await page.waitForSelector('h2:has-text("Login")');
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });
});
