import {expect, test} from "@playwright/test";

test('MOCK - MODIFY - Modify driver data for incorrect data', async ({ page }) => {
    // Mock the api call before navigating
    await page.route('https://api.openf1.org/v1/drivers?driver_number=1&session_key=7763', async (route) => {
        const checo =
            {
                "driver_number": 11,
                "broadcast_name": "S PEREZ",
                "full_name": "Sergio PEREZ",
                "name_acronym": "PER",
                "team_name": "Red Bull Racing",
                "team_colour": "3671C6",
                "first_name": "Sergio",
                "last_name": "Perez",
                "headshot_url": "https://www.formula1.com/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/1col/image.png",
                "country_code": "MEX",
                "session_key": 7763,
                "meeting_key": 1140
            };

        const response = await route.fetch();
        const json = await response.json();
        json.push(checo);

        // Fulfill using the original response, while patching the response body
        // with the given JSON object.
        await route.fulfill({ response, json });
    });

    // Go to the page
    await page.goto('https://smartqa-development.github.io/mock_api_modify/');

    // Assert that the second driver is visible fruit is visible
    await expect(page.getByText('Albon')).toBeVisible();
});
