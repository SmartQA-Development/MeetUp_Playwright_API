import { test, expect, APIRequestContext} from '@playwright/test';

// Request context is reused by all tests in the file.
let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // All requests we send go to this API endpoint.
        baseURL: 'https://webshop.mobiletestautomation.nl/api/',
        extraHTTPHeaders: {
            'Authorization': "Basic SzNKOVBQM1daTFdZQlBISko0N1hQSEFZTFo0RjNIV0Q6",
            'Output-Format': 'JSON'
        },
    });
});

test.afterAll(async ({ }) => {
    // Dispose all responses.
    await apiContext.dispose();
});

const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

test('FE and BE - Assignment - Create a new user & validate creation with a API call', async ({ page }) => {
    const email = `test@test${randomInt(0,1000)}.com`

    await page.goto('https://webshop.mobiletestautomation.nl/');
    await expect(page).toHaveTitle('SmartQA Test Automation');

    await page.getByText('Sign in').click();

    await page.getByText('No account? Create one here').click();

    await page.locator('.custom-radio input[value="1"]').click();
    await page.locator('input[name="firstname"]').fill("automation");
    await page.locator('input[name="lastname"]').fill("example");
    await page.locator('.form-group input[name="email"]').fill(email);
    await page.locator('input[name="password"]').fill("1qazxsw2");
    await page.locator('button.form-control-submit').click()

    await expect(page.getByText('automation example')).toBeVisible();

    // Create a request with a filer param
    const searchResponse = await apiContext.get('', {
        params: {

        }
    });

    // Create a request with the ID from the first call
    const newlyCreatedCustomerResponse = await apiContext.get(``, {});

    // Validate the email used from the FE automation
    const newlyCreatedCustomerJson = await newlyCreatedCustomerResponse.json()

});


// Answer below


















test('FE and BE - ANSWER - Create a new user & validate creation with a API call', async ({ page }) => {
    const email = `test@test${randomInt(0,1000)}.com`

    await page.goto('https://webshop.mobiletestautomation.nl/');
    await expect(page).toHaveTitle('SmartQA Test Automation');

    await page.getByText('Sign in').click();

    await page.getByText('No account? Create one here').click();

    await page.locator('.custom-radio input[value="1"]').click();
    await page.locator('input[name="firstname"]').fill("automation");
    await page.locator('input[name="lastname"]').fill("example");
    await page.locator('.form-group input[name="email"]').fill(email);
    await page.locator('input[name="password"]').fill("1qazxsw2");
    await page.locator('button.form-control-submit').click()

    await expect(page.getByText('automation example')).toBeVisible();

    const searchResponse = await apiContext.get('customers', {
        params: {
            'filter[email]': `[${email}]`,
        }
    });

    console.log(await searchResponse.json())

    const responseJson = await searchResponse.json()

    responseJson.customers[0].id

    const newlyCreatedCustomerResponse = await apiContext.get(`customers/${responseJson.customers[0].id}`, {});
    const newlyCreatedCustomerJson = await newlyCreatedCustomerResponse.json()
    expect(newlyCreatedCustomerJson.customer.email).toBe(email)
});