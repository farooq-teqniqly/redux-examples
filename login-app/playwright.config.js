import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'e2e',
      use: { browserName: 'chromium' },
    },
    {
      name: 'component',
      use: { ...require('@playwright/experimental-ct-react').devices['Desktop Chrome'] },
    },
  ],
});
