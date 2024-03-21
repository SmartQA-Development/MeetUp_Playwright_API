import { test, expect, request } from '@playwright/test';


test.beforeAll(async ({ request }) => {
    // Send authentication request for user.
    await request.post('https://webshop.mobiletestautomation.nl/login', {
        form: {
            'back': 'my-account',
            'email': 'user@smartqameetup.nl',
            'password': '1qazxsw2',
            'submitLogin': '1'
        }
    });
    await request.storageState({ path: 'playwright/.auth/user.json' });
});

// // AUTH: test below will use the saved auth state
test.use({ storageState: 'playwright/.auth/user.json' });

test('Auth - User logs in to the MyAccount page', async ({page }) => {
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

test('AUTH - ANSWER - BrowserContext - User should be logged in', async ({browser }) => {
    // Create a new incognito browser context
    const context = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
    // Create a new page inside context.
    const page = await context.newPage();

    await page.goto('https://webshop.mobiletestautomation.nl/');

    await expect(page).toHaveTitle('SmartQA Test Automation');

    await expect(page.getByText('Im aUser')).toBeVisible();
});

test.describe('AUTH - ANSWER - Grouped', () => {
    test.use({ storageState: 'playwright/.auth/user.json' });

    test('AUTH - ANSWER - Grouped - User should be logged in', async ({page }) => {
        await page.goto('https://webshop.mobiletestautomation.nl/');

        await expect(page).toHaveTitle('SmartQA Test Automation');

        await expect(page.getByText('Im aUser')).toBeVisible();
    });
});