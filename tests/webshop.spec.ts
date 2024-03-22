import { test, expect, request } from '@playwright/test';
import { create } from 'xmlbuilder2';
import { xml2js, js2xml } from 'xml-js';
import exp = require("constants");


test.beforeAll(async ({ request }) => {
    // Send authentication request for user.
    // await request.post('https://webshop.mobiletestautomation.nl/login', {
    //     form: {
    //         'back': 'my-account',
    //         'email': 'user@smartqameetup.nl',
    //         'password': '1qazxsw2',
    //         'submitLogin': '1'
    //     }
    // });
    // await request.storageState({ path: authUserFile });
});

// test.use({ storageState: 'playwright/.auth/user.json' });
// test.use({ storageState: 'playwright/.auth/admin.json' });
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
    const response = await request.get("https://webshop.mobiletestautomation.nl/api/customers", {
        headers:{
            'Authorization': "Basic SzNKOVBQM1daTFdZQlBISko0N1hQSEFZTFo0RjNIV0Q6",
            'Output-Format': 'JSON'
        },
        params:{
            'filter[lastname]':'[Tester]',
            'filter[firstname]':'[Test]'
        },
    });


    expect(response.ok()).toBeTruthy();

    expect(response.status()).toEqual(200)

    expect(response.statusText()).toEqual("OK")


    const respBody = await response.json()
    expect(respBody.customers[0].id).toBe(255)
});

test('Create user', async ({ request }) => {
    // const xml = '<?xml version="1.0" encoding="UTF-8"?><prestashop xmlns:xlink="http://www.w3.org/1999/xlink"><customer><id></id><id_default_group></id_default_group><id_lang></id_lang><newsletter_date_add></newsletter_date_add><ip_registration_newsletter></ip_registration_newsletter><last_passwd_gen></last_passwd_gen><secure_key></secure_key><deleted></deleted><passwd>1qazxsw2</passwd><lastname>Created</lastname><firstname>API</firstname><email>newNAAUser@smartqameetup.nl</email><id_gender></id_gender><birthday></birthday><newsletter></newsletter><optin></optin><website></website><company></company><siret></siret><ape></ape><outstanding_allow_amount></outstanding_allow_amount><show_public_prices></show_public_prices><id_risk></id_risk><max_payment_days></max_payment_days><active>1</active><note></note> <is_guest></is_guest><id_shop></id_shop><id_shop_group></id_shop_group><date_add></date_add><date_upd></date_upd><reset_password_token></reset_password_token><reset_password_validity></reset_password_validity><associations><groups><group><id>3</id></group></groups></associations></customer></prestashop>'

    // Build XML payload
    // const xmlPayload = create(xml).end({ prettyPrint: true });

    const customerCreated = await request.post("https://webshop.mobiletestautomation.nl/api/customers", {
        headers:{
            'Authorization': "Basic SzNKOVBQM1daTFdZQlBISko0N1hQSEFZTFo0RjNIV0Q6",
            'Content-Type' : "application/xml"
            // 'Output-Format': 'JSON'
        },
        params:{
            'resource':'customers',
        }
    });

    expect(customerCreated.ok()).toBeTruthy();
});

test('Create user HUH', async ({ request }) => {
    const customerCreated = await request.get("https://webshop.mobiletestautomation.nl/api/customers", {
        headers:{
            'Authorization': "Basic SzNKOVBQM1daTFdZQlBISko0N1hQSEFZTFo0RjNIV0Q6",
            // 'Content-Type' : "application/xml"
            // 'Output-Format': 'JSON'
        },
        params:{
            'schema':'blank',
        },
    });

    console.log(await customerCreated.text())

    const xml = `<prestashop xmlns:xlink="http://www.w3.org/1999/xlink"><customer><id></id><id_default_group></id_default_group><id_lang></id_lang><newsletter_date_add></newsletter_date_add><ip_registration_newsletter></ip_registration_newsletter><last_passwd_gen></last_passwd_gen><secure_key></secure_key><deleted></deleted><passwd>1qazxsw2</passwd><lastname>Created</lastname><firstname>API</firstname><email>newNAAUser@smartqameetup.nl</email><id_gender></id_gender><birthday></birthday><newsletter></newsletter><optin></optin><website></website><company></company><siret></siret><ape></ape><outstanding_allow_amount></outstanding_allow_amount><show_public_prices></show_public_prices><id_risk></id_risk><max_payment_days></max_payment_days><active>1</active><note></note> <is_guest></is_guest><id_shop></id_shop><id_shop_group></id_shop_group><date_add></date_add><date_upd></date_upd><reset_password_token></reset_password_token><reset_password_validity></reset_password_validity><associations><groups><group><id>3</id></group></groups></associations></customer></prestashop>`

    const customerHopeCreated = await request.post("https://webshop.mobiletestautomation.nl/api/customers", {
        headers:{
            'Authorization': "Basic SzNKOVBQM1daTFdZQlBISko0N1hQSEFZTFo0RjNIV0Q6",
            'Content-Type' : "text/xml"
            // 'Output-Format': 'JSON'
        },
        params:{
            'resource':'customers',
            'postXml': xml
        },
        // data:{
        //     body:xml
        // }
    });
});

