import {expect, test} from "@playwright/test";


test('REST calls - Get all customers from the prestashop', async ({ request }) => {
    const allCustomers = await request.get("https://webshop.mobiletestautomation.nl/api/customers", {
        headers:{
            'Authorization': "Basic SzNKOVBQM1daTFdZQlBISko0N1hQSEFZTFo0RjNIV0Q6",
            'Output-Format': 'JSON'
        },
    });

    //show response data in json form
    console.log(await allCustomers.json())

    //generic assertion
    expect(allCustomers.ok()).toBeTruthy();

    //assertion from the response itself
    await expect(allCustomers).toBeOK();

    const respBody = await allCustomers.json()
    expect(respBody).toHaveProperty('customers')
});

test('REST calls - Get customer with ID number 5', async ({ request }) => {
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

    //Validate the content
    const respBody = await customerFive.json()
    expect(respBody.customer.firstname).toBe("Donna")
});

test('REST calls - Assignment - Generic call to the api', async ({ request }) => {
    const allPaths = await request.get("", {
        headers:{
            'Authorization': "Basic SzNKOVBQM1daTFdZQlBISko0N1hQSEFZTFo0RjNIV0Q6",
            'Output-Format': 'JSON'
        },
    });

    //generic assertion

    //assertion from the response itself

    //Validate the content
});

test('REST calls - Assignment - Get store with ID number 1', async ({ request }) => {
    const storeOne = await request.get("https://webshop.mobiletestautomation.nl/api/customers/5", {
        headers:{
            'Authorization': "Basic SzNKOVBQM1daTFdZQlBISko0N1hQSEFZTFo0RjNIV0Q6",
            'Output-Format': 'JSON'
        },
    });

    //generic assertion


    //assertion from the response itself


    //Validate the content

});

test('REST calls - ANSWER - Generic call to the api', async ({ request }) => {
    const allPaths = await request.get("https://webshop.mobiletestautomation.nl/api", {
        headers:{
            'Authorization': "Basic SzNKOVBQM1daTFdZQlBISko0N1hQSEFZTFo0RjNIV0Q6",
            'Output-Format': 'JSON'
        },
    });

    //generic assertion
    expect(allPaths.ok()).toBeTruthy();

    //assertion from the response itself
    await expect(allPaths).toBeOK();

    //Validate the content
    const respBody = await allPaths.json()
    expect(respBody).toContain('stores')
});

test('REST calls - ANSWER - Get store with ID number 1', async ({ request }) => {
    const storeOne = await request.get("https://webshop.mobiletestautomation.nl/api/stores/1", {
        headers:{
            'Authorization': "Basic SzNKOVBQM1daTFdZQlBISko0N1hQSEFZTFo0RjNIV0Q6",
            'Output-Format': 'JSON'
        },
    });

    //generic assertion
    expect(storeOne.ok()).toBeTruthy();

    //assertion from the response itself
    await expect(storeOne).toBeOK();

    //Validate the content
    const respBody = await storeOne.json()
    expect(respBody.store.address1).toBe("3030 SW 8th St Miami")
});