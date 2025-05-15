import { defineConfig } from "@playwright/test";
import { devices } from "@playwright/experimental-ct-react";

export default defineConfig({
  projects: [
    {
      name: "e2e",
      use: { browserName: "chromium" },
    },
    {
      name: "component",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
