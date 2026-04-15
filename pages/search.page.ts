import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class SearchPage extends BasePage {
  readonly productTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.productTitle = page.getByRole('heading', { name: /pliers|hammer|saw|wrench/i }).first();
  }

  async assertSearchResultVisible(): Promise<void> {
    await expect(this.productTitle).toBeVisible();
  }
}
