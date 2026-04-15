import { defineConfig, devices } from '@playwright/test';
import { envConfig } from './config/env.config';

const browserProjects = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
];

export default defineConfig({
  testDir: './tests',
  timeout: envConfig.timeoutMs,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: envConfig.workers,
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'],
  ],
  use: {
    baseURL: envConfig.baseUrl,
    headless: envConfig.headless,
    launchOptions: {
      slowMo: envConfig.slowMoMs,
    },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
  },
  projects: browserProjects.filter((project) => envConfig.browsers.includes(project.name)),
});
