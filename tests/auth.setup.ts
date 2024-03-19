import { test as setup } from '@playwright/test';

const userFile = 'playwright/.auth/user.json';

setup('authenticate user', async ({ request }) => {
    // Send user authentication request.
    await request.post('https://webshop.mobiletestautomation.nl/login', {
        form: {
            'back': 'my-account',
            'email': 'user@smartqameetup.nl',
            'password': '1qazxsw2',
            'submitLogin': '1'
        }
    });

    await request.storageState({ path: userFile });
});

const adminFile = 'playwright/.auth/admin.json';

setup('authenticate admin', async ({ request }) => {
    // Send user authentication request.
    await request.post('https://webshop.mobiletestautomation.nl/login', {
        form: {
            'back': 'my-account',
            'email': 'admin@smartqameetup.nl',
            'password': '1qazxsw2',
            'submitLogin': '1'
        }
    });

    await request.storageState({ path: adminFile });
});