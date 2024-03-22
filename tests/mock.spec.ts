import { test, expect, type Page } from '@playwright/test';

test.describe('Mocking an API call', () => {

    test('mocks a fruit and does not call api', async ({ page }) => {
        // Mock the api call before navigating
        await page.route('*/**/api/v1/fruits', async (route) => {
            const json = [{ name: 'Strawberry', id: 21 }];
            await route.fulfill({ json });
        });
        // Go to the page
        await page.goto('https://demo.playwright.dev/api-mocking');

        // Assert that the Strawberry fruit is visible
        await expect(page.getByText('Strawberry')).toBeVisible();
    });

    test('mocks verstappen info', async ({ page }) => {
        // Mock the api call before navigating
        await page.route('https://ergast.com/api/f1/drivers/verstappen.json', async (route) => {
            const json = {
                "MRData": {
                    "xmlns": "http:\/\/ergast.com\/mrd\/1.5",
                    "series": "f1",
                    "url": "http://ergast.com/api/f1/drivers/verstappen.json",
                    "limit": "30",
                    "offset": "0",
                    "total": "1",
                    "DriverTable": {
                        "driverId": "verstappen",
                        "Drivers": [
                            {
                                "driverId": "verstappen",
                                "url": "http:\/\/en.wikipedia.org\/wiki\/Jos_Verstappen",
                                "givenName": "Max",
                                "familyName": "Verstappen",
                                "dateOfBirth": "1972-03-04",
                                "nationality": "Dutch"
                            }
                        ]
                    }
                }
            };
            await route.fulfill({ json });
        });
        // Go to the page
        await page.goto('http://localhost:3000/gb_app');

        // Assert that the Strawberry fruit is visible
        await expect(page.getByText('Strawberry')).toBeVisible();
    });

});

test('mocks verstappen info NEW', async ({ page }) => {
    // Mock the api call before navigating
    await page.route('https://api.openf1.org/v1/drivers?driver=max', async (route) => {
        const json = [
            {
                "driver_number": 333333333,
                "broadcast_name": "M VERSTAPPEN",
                "full_name": "Max VERSTAPPEN",
                "name_acronym": "VER",
                "team_name": "Red Bull Racing",
                "team_colour": "3671C6",
                "first_name": "Max",
                "last_name": "Verstappen",
                "headshot_url": "https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/1col/image.png",
                "country_code": "NED",
                "session_key": 7763,
                "meeting_key": 1140
            }
        ];
        await route.fulfill({ json });
    });
    // Go to the page
    await page.goto('https://smartqa-development.github.io/mock_api_full/');

    // Assert that the Strawberry fruit is visible
    await expect(page.getByText('Strawberry')).toBeVisible();
});