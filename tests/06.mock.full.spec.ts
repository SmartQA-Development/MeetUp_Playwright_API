import {expect, test} from "@playwright/test";


test('MOCK - FULL - Assignment - Mock driver data for unfinished endpoint', async ({ page }) => {
    // Mock the api call before navigating
    await page.route('', async (route) => {
        const json = [
            {
            }
        ];
        await route.fulfill({ json });
    });

    // Go to the page
    await page.goto('https://smartqa-development.github.io/mock_api_full/');

    // Assert that the Strawberry fruit is visible
    await expect(page.getByText('MAX VERSTAPPEN')).toBeVisible();
});

// Answer below










test('MOCK - FULL - ANSWER - Mock driver data for unfinished endpoint', async ({ page }) => {
    // Mock the api call before navigating
    await page.route('https://api.openf1.org/v1/drivers?driver=max', async (route) => {
        const json = [
            {
                "driver_number": 1,
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
    await expect(page.getByText('MAX VERSTAPPEN')).toBeVisible();
});
