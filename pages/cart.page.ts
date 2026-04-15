import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly cartItemRows: Locator;
  readonly cartQuantityBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItemRows = page.locator('tbody tr, [data-test*="cart-item"]');
    this.cartQuantityBadge = page.locator('[data-test="cart-quantity"], .badge').first();
  }

  async assertCartHasItems(): Promise<void> {
    const hasBadge = await this.cartQuantityBadge.isVisible().catch(() => false);
    if (hasBadge) {
      await expect(this.cartQuantityBadge).not.toHaveText(/^0$/);
      return;
    }

    await expect(this.cartItemRows.first()).toBeVisible();
  }
}
