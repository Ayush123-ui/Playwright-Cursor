import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { SearchPage } from '../pages/search.page';
import { CartPage } from '../pages/cart.page';
import { getUserTestData } from '../utils/data-loader';
import { ApiClient } from '../utils/api-client';
import { envConfig } from '../config/env.config';

type AppFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  searchPage: SearchPage;
  cartPage: CartPage;
  apiClient: ApiClient;
  testData: ReturnType<typeof getUserTestData>;
};

export const test = base.extend<AppFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  apiClient: async ({ request }, use) => {
    await use(new ApiClient(request, envConfig.apiBaseUrl));
  },
  testData: async ({}, use) => {
    await use(getUserTestData());
  },
});

export { expect } from '@playwright/test';
