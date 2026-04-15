type EnvironmentName = 'qa' | 'staging' | 'prod';

interface EnvironmentConfig {
  name: EnvironmentName;
  baseUrl: string;
  apiBaseUrl: string;
  timeoutMs: number;
  headless: boolean;
  slowMoMs: number;
  workers: number;
  browsers: string[];
}

const environmentMap: Record<EnvironmentName, Omit<EnvironmentConfig, 'name'>> = {
  qa: {
    baseUrl: 'https://practicesoftwaretesting.com',
    apiBaseUrl: 'https://api.practicesoftwaretesting.com',
    timeoutMs: 60_000,
    headless: false,
    slowMoMs: 500,
    workers: 1,
    browsers: ['chromium'],
  },
  staging: {
    baseUrl: 'https://practicesoftwaretesting.com',
    apiBaseUrl: 'https://api.practicesoftwaretesting.com',
    timeoutMs: 60_000,
    headless: false,
    slowMoMs: 500,
    workers: 1,
    browsers: ['chromium'],
  },
  prod: {
    baseUrl: 'https://practicesoftwaretesting.com',
    apiBaseUrl: 'https://api.practicesoftwaretesting.com',
    timeoutMs: 60_000,
    headless: false,
    slowMoMs: 500,
    workers: 1,
    browsers: ['chromium'],
  },
};

function resolveEnvironmentName(): EnvironmentName {
  const rawEnv = (process.env.TEST_ENV || 'qa').toLowerCase() as EnvironmentName;
  return rawEnv in environmentMap ? rawEnv : 'qa';
}

function resolveBrowsers(): string[] {
  const rawBrowsers = process.env.PW_BROWSERS || 'chromium';
  const parsed = rawBrowsers
    .split(',')
    .map((browser) => browser.trim().toLowerCase())
    .filter(Boolean);

  return parsed.length > 0 ? parsed : ['chromium'];
}

const selectedEnvironment = resolveEnvironmentName();
const selectedConfig = environmentMap[selectedEnvironment];

export const envConfig: EnvironmentConfig = {
  name: selectedEnvironment,
  baseUrl: process.env.BASE_URL || selectedConfig.baseUrl,
  apiBaseUrl: process.env.API_BASE_URL || selectedConfig.apiBaseUrl,
  timeoutMs: Number(process.env.TEST_TIMEOUT_MS) || selectedConfig.timeoutMs,
  headless: process.env.HEADLESS ? process.env.HEADLESS === 'true' : selectedConfig.headless,
  slowMoMs: Number(process.env.SLOW_MO_MS) || selectedConfig.slowMoMs,
  workers: Number(process.env.PW_WORKERS) || selectedConfig.workers,
  browsers: resolveBrowsers(),
};
