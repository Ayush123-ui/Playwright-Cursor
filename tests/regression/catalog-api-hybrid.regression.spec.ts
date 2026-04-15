import { expect, test } from '../../fixtures/test.fixture';

test.describe('Catalog API + UI Hybrid Suite @regression @api', () => {
  test('should validate product from API appears in UI search', async ({ apiClient, homePage, page }) => {
    const products = await apiClient.getCatalogProducts();
    expect(products.length).toBeGreaterThan(0);

    const firstNamedProduct = products.find((product) => product.name && product.name.trim().length > 0);
    expect(firstNamedProduct).toBeDefined();

    const productName = firstNamedProduct?.name as string;

    await homePage.openHomePage();
    await homePage.searchForProduct(productName);

    await expect(page.getByRole('heading', { name: new RegExp(productName, 'i') }).first()).toBeVisible();
  });
});
