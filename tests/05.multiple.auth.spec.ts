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

        await expect(page.getByText('Im aUser')).toBeVisible();
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

        await expect(page.getByText('Im aUser')).toBeVisible();
        // await expect(page.getByText('Im anAdmin')).toBeVisible();
    });
});