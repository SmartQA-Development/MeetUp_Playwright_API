import { test, expect, request } from '@playwright/test';

test('Check PP interaction', async ({page }) => {
    await page.goto('https://p2p.acceptatie.pp-group.eu/');

    // Login
    await page.locator('cap-input[data-test=\'email\'] input').fill('administrator-cfto@pp-group.eu');
    await page.locator('cap-input.cap-password input').fill('WDoDc#On37HkT7n');
    await page.locator("button[type='submit']").click();

    // Navigation
    await page.locator('a[href="#/admin/invoices/inbox"]').click();

    //Filter selection
    await page.locator('.cap-table-filters').getByText("company").click()
    const companyName = "CFTO";
    await page.locator(    `li[aria-label='${companyName}']`).click();
    await page.locator('div.p-multiselect-footer button').click();

    await page.locator('.cap-table-filters').getByText("status").click()
    const invoiceStatus = "New";
    await page.locator(    `li[aria-label='${invoiceStatus}']`).click();
    await page.locator('div.p-multiselect-footer button').click();

    const firstRow = await page.locator('.row-divider').nth(0)
    await firstRow.waitFor()

    await page
        .locator('td[data-test="table_cell_translated_status"] span.td-value')
        .first()
        .getByText("New", {exact: true})
        .waitFor();



    // await page.locator('form#login-form button[type="submit"]').click();
    // await page.getByRole('button', { name: /Sign in/i }).click();

    // await expect(page.locator('section#main h1')).toContainText('Your account');
    // await expect(page.getByRole('heading', {name:'Your account'})).toContainText('Your account');
});