import {expect, test} from "@playwright/test";


test.describe('User', () => {
    test.use({ storageState: 'playwright/.auth/user.json' });

    test('User logs in to the MyAccount page', async ({page }) => {
        // // Create a new incognito browser context
        // const context = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        // // Create a new page inside context.
        // const page = await context.newPage();

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
});

test.describe('Admin', () => {
    test.use({ storageState: 'playwright/.auth/admin.json' });

    test('Admin logs in to the MyAccount page', async ({page }) => {
        // // Create a new incognito browser context
        // const context = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        // // Create a new page inside context.
        // const page = await context.newPage();

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
});