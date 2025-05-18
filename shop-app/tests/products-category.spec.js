import { test, expect } from "@playwright/test";

test.describe("Products in Category Page", () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Start each test with a logged-in user
    // 1. Navigate to homepage
    await page.goto("/");

    // 2. Perform login with valid credentials
    await page.getByPlaceholder("Username").fill("emilys");
    await page.getByPlaceholder("Password").fill("emilyspass");
    await page.getByRole("button", { name: "Login" }).click();

    // 3. Ensure we're on the categories page
    await page.waitForURL("/categories");
  });

  test("should display products for a category", async ({ page }) => {
    // Test successful product listing:
    // 1. Mock API response with test products
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

    // 2. Navigate to a specific category
    const firstCategory = page.locator("a").first();
    await firstCategory.waitFor({ state: "visible" });
    const categoryHref = await firstCategory.getAttribute("href");
    await firstCategory.click();

    // 3. Verify navigation was successful
    await page.waitForURL(`**${categoryHref}`);

    // 4. Verify page structure and navigation elements
    await expect(page.getByRole("heading", { level: 2 })).toBeVisible();
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();

    // 5. Verify products are displayed correctly
    const productItems = page.locator("li");
    await expect(productItems).toHaveCount(2);
    await expect(productItems.first()).toHaveText("Test Product 1");
  });

  test("should handle loading state", async ({ page }) => {
    // Test loading state display:
    // 1. Mock delayed API response to ensure loading state is visible
    await page.route("**/products/category/**", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          products: [{ id: 1, title: "Test Product" }],
        }),
      });
    });

    // 2. Navigate to category
    const firstCategory = page.locator("a").first();
    await firstCategory.waitFor({ state: "visible" });
    await firstCategory.click();

    // 3. Verify loading indicator is shown
    await expect(page.getByText("Loading...")).toBeVisible();
  });

  test("should handle error state", async ({ page }) => {
    // Test error handling:
    // 1. Mock API error response
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

    // 2. Navigate to category
    const firstCategory = page.locator("a").first();
    await firstCategory.waitFor({ state: "visible" });
    await firstCategory.click();

    // 3. Verify error message is displayed
    await expect(page.locator('p[style*="color: red"]')).toBeVisible();
  });

  test("should handle logout", async ({ page }) => {
    // Test logout functionality:
    // 1. Navigate to a category
    const firstCategory = page.locator("a").first();
    await firstCategory.waitFor({ state: "visible" });
    await firstCategory.click();

    // 2. Perform logout action
    await page.getByRole("button", { name: "Logout" }).click();

    // 3. Verify redirect to login page
    await page.waitForURL("/");
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });
});
