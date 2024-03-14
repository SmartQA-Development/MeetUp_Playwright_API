import { test, expect } from '@playwright/test';

test('User logs in to the MyAccount page', async ({page }) => {
    await page.goto('https://webshop.mobiletestautomation.nl/');

    await expect(page).toHaveTitle('SmartQA Test Automation');

    await page.getByText('Sign in').click();

    await page.locator('form#login-form input[type="email"]').fill('testerino@tester.com');
    await page.locator('form#login-form input[type="password"]').fill('1qazxsw2');

    // await page.locator('form#login-form button[type="submit"]').click();
    await page.getByRole('button', { name: /Sign in/i }).click();

    // await expect(page.locator('section#main h1')).toContainText('Your account');
    await expect(page.getByRole('heading', {name:'Your account'})).toContainText('Your account');

});