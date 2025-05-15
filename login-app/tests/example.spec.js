import { test, expect } from '@playwright/test';

test('homepage has Hello World', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Hello World')).toBeVisible();
});
