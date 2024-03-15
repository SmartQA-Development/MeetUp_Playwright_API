import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ request }) => {
    // Send authentication request. Replace with your own.
    await request.post('https://webshop.mobiletestautomation.nl/login', {
        form: {
            'back': 'my-account',
            'email': 'testerino@tester.com',
            'password': '1qazxsw2',
            'submitLogin': '1'
        }
    });
    await request.storageState({ path: authFile });
});