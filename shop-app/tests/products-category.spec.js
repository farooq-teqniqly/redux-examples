import { test, expect } from "@playwright/test";

test.describe("Products in Category Page", () => {
  test.beforeEach(async ({ page }) => {
    // Start from homepage
    await page.goto("/");

    // Login
    await page.getByPlaceholder("Username").fill("emilys");
    await page.getByPlaceholder("Password").fill("emilyspass");
    await page.getByRole("button", { name: "Login" }).click();

    // Wait for navigation to categories page
    await page.waitForURL("/categories");
  });

  test("should display products for a category", async ({ page }) => {
    // Setup request interception to ensure API call succeeds
    await page.route("**/products/category/**", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          products: [
            { id: 1, title: "Test Product 1" },
            { id: 2, title: "Test Product 2" },
          ],
        }),
      });
    });

    // Click first category link
    const firstCategory = page.locator("a").first();
    await firstCategory.waitFor({ state: "visible" });
    const categoryHref = await firstCategory.getAttribute("href");
    await firstCategory.click();

    // Wait for navigation to products page
    await page.waitForURL(`**${categoryHref}`);

    // Basic UI elements should be visible
    await expect(page.getByRole("heading", { level: 2 })).toBeVisible();
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();

    // Wait for products to load and verify
    const productItems = page.locator("li");
    await expect(productItems).toHaveCount(2);
    await expect(productItems.first()).toHaveText("Test Product 1");
  });

  test("should handle loading state", async ({ page }) => {
    // Setup delayed response to ensure loading state is visible
    await page.route("**/products/category/**", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          products: [{ id: 1, title: "Test Product" }],
        }),
      });
    });

    // Click first category
    const firstCategory = page.locator("a").first();
    await firstCategory.waitFor({ state: "visible" });
    await firstCategory.click();

    // Loading state should be visible
    await expect(page.getByText("Loading...")).toBeVisible();
  });

  test("should handle error state", async ({ page }) => {
    // Setup error response
    await page.route("**/products/category/**", (route) =>
      route.fulfill({
        status: 500,
        body: JSON.stringify({
          response: {
            data: {
              message: "Server error",
            },
          },
        }),
      }),
    );

    // Click first category
    const firstCategory = page.locator("a").first();
    await firstCategory.waitFor({ state: "visible" });
    await firstCategory.click();

    await expect(page.locator('p[style*="color: red"]')).toBeVisible();
  });

  test("should handle logout", async ({ page }) => {
    // Click first category
    const firstCategory = page.locator("a").first();
    await firstCategory.waitFor({ state: "visible" });
    await firstCategory.click();

    // Click logout
    await page.getByRole("button", { name: "Logout" }).click();

    // Should redirect to login page
    await page.waitForURL("/");
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });
});
