# Playwright TypeScript Framework (CommonJS)

Clean, industry-style Playwright automation framework built for `https://practicesoftwaretesting.com` using:
- TypeScript only
- CommonJS module system
- Page Object Model (POM)
- Reusable custom fixtures
- Environment-driven configuration
- HTML reporting

## Project Structure

```text
.
├── config/
│   └── env.config.ts
├── fixtures/
│   └── test.fixture.ts
├── pages/
│   ├── base.page.ts
│   ├── home.page.ts
│   ├── login.page.ts
│   ├── search.page.ts
│   └── cart.page.ts
├── test-data/
│   └── users.json
├── tests/
│   ├── smoke/
│   │   ├── login.smoke.spec.ts
│   │   ├── search.smoke.spec.ts
│   │   └── add-to-cart.smoke.spec.ts
│   └── regression/
│       └── catalog.regression.spec.ts
├── utils/
│   ├── data-loader.ts
│   └── types.ts
├── playwright.config.ts
└── tsconfig.json
```

## Setup

```bash
npm install
npx playwright install
```

## Run Tests

```bash
# all tests
npm test

# smoke suite
npm run test:smoke

# regression suite
npm run test:regression

# tag-based smoke run
npm run test:tag:smoke

# tag-based regression run
npm run test:tag:regression

# run headed
npm run test:headed

# open html report
npm run report
```

## Environment Configuration

Copy `.env.example` into `.env` and override values as needed.

Supported variables:
- `TEST_ENV` (`qa` | `staging` | `prod`)
- `BASE_URL`
- `API_BASE_URL`
- `HEADLESS` (`true`/`false`)
- `SLOW_MO_MS` (milliseconds delay between actions)
- `PW_WORKERS` (default `1` for single-browser observation mode)
- `PW_BROWSERS` (comma-separated project names, e.g. `chromium,firefox`)
- `TEST_TIMEOUT_MS`

## Framework Notes

- `fixtures/test.fixture.ts` centralizes reusable app fixtures and test-data loading.
- `pages/` contains clean POM classes with encapsulated selectors and actions.
- `tests/smoke` contains critical-path scenarios (login, search, add-to-cart).
- `tests/regression` is designed for broader coverage growth over time.
- Smoke and regression suites support tag-based execution (`@smoke`, `@regression`).
- `utils/api-client.ts` enables hybrid UI + API validation patterns.
- HTML reports are generated under `playwright-report/`.
- Default execution uses one browser project (`chromium`) and one worker for easier visual debugging.
- CI runs a matrix for smoke tests across browser/environment combinations.
