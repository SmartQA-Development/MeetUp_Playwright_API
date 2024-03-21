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