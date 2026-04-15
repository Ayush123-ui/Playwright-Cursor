import { expect, test } from '../../fixtures/test.fixture';

test.describe('Catalog Regression Suite @regression', () => {
  test('should load home catalog with at least one product card', async ({ homePage, page }) => {
    await homePage.openHomePage();
    const cards = page.locator('[data-test="product-card"], .card');
    await expect(await cards.count()).toBeGreaterThan(0);
  });
});
