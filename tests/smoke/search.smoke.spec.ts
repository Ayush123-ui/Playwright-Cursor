import { expect, test } from '../../fixtures/test.fixture';

test.describe('Search Smoke Suite @smoke', () => {
  test('should search and display relevant products', async ({ homePage, page, searchPage }) => {
    const query = 'Pliers';

    await homePage.openHomePage();
    await homePage.searchForProduct(query);

    await expect(page.getByRole('heading', { name: /searched for:\s*pliers/i })).toBeVisible();
    await searchPage.assertSearchResultVisible();
  });
});
