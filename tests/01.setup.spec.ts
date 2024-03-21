import {expect, test} from "@playwright/test";


test('FE check - User logs in to the MyAccount page', async ({page }) => {
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


test('BE check - Get customer number 5', async ({ request }) => {
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

    // response data assertion
    const respBody = await customerFive.json()
    expect(respBody.customer.id).toBe(5)
});
