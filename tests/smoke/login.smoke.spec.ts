import { test } from '../../fixtures/test.fixture';

test.describe('Authentication Smoke Suite @smoke', () => {
  test('should login with standard customer account', async ({ homePage, loginPage, testData }) => {
    await homePage.openHomePage();
    await homePage.goToLoginPage();
    await loginPage.login(testData.standardUser);
    await loginPage.assertLoginFlowIsSuccessfulOrBlocked();
  });
});
