import {expect, test} from "@playwright/test";


test('REST calls - Assignment - 01 - Generic call to the api', async ({ request }) => {
    const allPaths = await request.get("", {
        headers:{
            'Authorization': "Basic SzNKOVBQM1daTFdZQlBISko0N1hQSEFZTFo0RjNIV0Q6",
            'Output-Format': 'JSON'
        },
    });

    //assert status || status Text


});

test('REST calls - Assignment - 02 - Get store with ID number 1', async ({ request }) => {
    const storeOne = await request.get("", {
        headers:{
            'Authorization': "Basic SzNKOVBQM1daTFdZQlBISko0N1hQSEFZTFo0RjNIV0Q6",
            'Output-Format': 'JSON'
        },
    });

    //assert status || status Text

});

test('REST calls - Assignment - 03 - Get store with ID number 3 and validate the store name', async ({ request }) => {
    const storeOne = await request.get("", {
        headers:{
            'Authorization': "Basic SzNKOVBQM1daTFdZQlBISko0N1hQSEFZTFo0RjNIV0Q6",
            'Output-Format': 'JSON'
        },
    });

    //assert status || status Text

    //assert store name

});

// Answers below




















test('REST calls - ANSWER - 01 - Generic call to the api', async ({ request }) => {
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

test('REST calls - ANSWER - 02 - Get store with ID number 1', async ({ request }) => {
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

test('REST calls - ANSWER - 03 - Get store with ID number 3 and validate the store name', async ({ request }) => {
    const storeThree = await request.get("https://webshop.mobiletestautomation.nl/api/stores/3", {
        headers:{
            'Authorization': "Basic SzNKOVBQM1daTFdZQlBISko0N1hQSEFZTFo0RjNIV0Q6",
            'Output-Format': 'JSON'
        },
    });

    //generic assertion
    expect(storeThree.ok()).toBeTruthy();

    //assertion from the response itself
    await expect(storeThree).toBeOK();

    //Validate the content
    const respBody = await storeThree.json()
    expect(respBody.store.name).toBe("Pembroke Pines")
});