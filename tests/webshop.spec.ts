import { test, expect, request } from '@playwright/test';
import exp = require("constants");

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

test('Get customer number 5', async ({ request }) => {
    const customerFive = await request.get("https://webshop.mobiletestautomation.nl/api/customers/5", {
        headers:{
            'Authorization': "Basic SzNKOVBQM1daTFdZQlBISko0N1hQSEFZTFo0RjNIV0Q6",
            'Output-Format': 'JSON'
        },
    });

    //generic assertion
    expect(customerFive.ok()).toBeTruthy();

    //assertion from the response itself
    await expect(customerFive).toBeOK();

    const respBody = await customerFive.json()
    expect(respBody.customer.id).toBe(5)
});

test('Get customer filter by Name', async ({ request }) => {
    const customersByNameFilterd = await request.get("https://webshop.mobiletestautomation.nl/api/customers", {
        headers:{
            'Authorization': "Basic SzNKOVBQM1daTFdZQlBISko0N1hQSEFZTFo0RjNIV0Q6",
            'Output-Format': 'JSON'
        },
        params:{
            'filter[lastname]':'[Tester]',
            'filter[firstname]':'[Test]'
        }
    });

    //generic assertion
    expect(customersByNameFilterd.ok()).toBeTruthy();

    //assertion from the response itself
    await expect(customersByNameFilterd).toBeOK();

    const respBody = await customersByNameFilterd.json()
    expect(respBody.customers[0].id).toBe(255)
});