import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly signInLink: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly firstProductLink: Locator;
  readonly productDetailsAddToCartButton: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.signInLink = page.getByRole('link', { name: /sign in/i });
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.searchButton = page.getByRole('button', { name: /^search$/i });
    this.firstProductLink = page.locator('a[href*="/product/"]').first();
    this.productDetailsAddToCartButton = page.getByRole('button', { name: /add to cart/i });
    this.cartLink = page.locator('a[href*="/checkout/cart"], [data-test="nav-cart"], a[aria-label*="cart" i]').first();
  }

  async openHomePage(): Promise<void> {
    await this.page.goto('/');
    await expect(this.page).toHaveURL(/practicesoftwaretesting\.com/);
  }

  async goToLoginPage(): Promise<void> {
    await this.clickWhenVisible(this.signInLink);
  }

  async searchForProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async addFirstListedProductToCart(): Promise<void> {
    await this.clickWhenVisible(this.firstProductLink);
    await this.clickWhenVisible(this.productDetailsAddToCartButton);
  }

  async openCart(): Promise<void> {
    await this.clickWhenVisible(this.cartLink);
  }
}
