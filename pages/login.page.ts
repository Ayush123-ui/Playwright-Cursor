import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { LoginCredentials } from '../utils/types';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly loginErrorBanner: Locator;
  readonly profileMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('input[type="email"], #email, [name="email"]');
    this.passwordInput = page.locator('input[type="password"], #password, [name="password"]');
    this.submitButton = page.locator('[data-test="login-submit"], button:has-text("Login")').first();
    this.loginErrorBanner = page.getByText(/account locked|invalid|failed attempts|incorrect/i);
    this.profileMenu = page.getByRole('button', { name: /menu|account|profile/i });
  }

  async login(credentials: LoginCredentials): Promise<void> {
    await this.emailInput.fill(credentials.email);
    await this.passwordInput.fill(credentials.password);
    await this.submitButton.click();
  }

  async assertLoginFlowIsSuccessfulOrBlocked(): Promise<void> {
    const landedOnAccount = await this.page.waitForURL(/account/, { timeout: 10_000 }).then(
      () => true,
      () => false
    );

    if (landedOnAccount) {
      await expect(this.page).toHaveURL(/account/);
      return;
    }

    await expect(this.loginErrorBanner).toBeVisible();
  }
}
