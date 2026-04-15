import { test } from '../../fixtures/test.fixture';

test.describe('Cart Smoke Suite @smoke', () => {
  test('should add product to cart from catalog page', async ({ homePage, cartPage }) => {
    await homePage.openHomePage();
    await homePage.addFirstListedProductToCart();
    await homePage.openCart();
    await cartPage.assertCartHasItems();
  });
});
