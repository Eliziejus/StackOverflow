import {test, expect } from "@playwright/test";

test.describe('StackOverflow Question And Tags Test', () => {
    let cookies;

    test.beforeEach(async ({ page }) => {

        await page.goto('https://stackoverflow.com/');
        cookies = await page.getByRole('region').first();
        for (let i = 0; i < 4; i++) {
            await cookies.press('ArrowDown');
        }
        await page.getByText('Accept all cookies').click();
    })

      test('Open Question section', async ({ page }) => {
        
        await page.getByRole('menuitem').first().click();
        await page.getByText('Questions').first().click();
        await page.getByText('Filter').first().click();
        await page.getByText('No accepted answer').check();
        await page.getByText('Recent activity').check();
        await page.getByRole('combobox', { name: 'The following tags:' }).fill("Typescript ");
        await page.getByText('Apply filter').click();


        await expect(cookies).toBeHidden()
        await expect(page).toHaveTitle("Custom filtered 'typescript' questions - Stack Overflow");
        await expect(page.getByText('No accepted answer')).toBeChecked();
        await expect(page.getByText('Recent activity')).toBeChecked();
        await expect(page.getByRole('combobox', { name: 'The following tags:' })).toBeEmpty();
        await expect(page.url()).toContain('/questions');
        await expect(page.getByPlaceholder('Search…')).toHaveValue('[typescript]')

      });

      test('Open Tags section', async ({ page }) => {

        await page.getByRole('menuitem').first().click();
        await page.getByText('Tags').first().click();
        await page.getByPlaceholder('Filter by tag name').fill("Typescript");

        await page.waitForLoadState();



        await page.getByTitle(`show questions tagged 'typescript'`).hover()
        await page.getByTitle(`show questions tagged 'typescript'`).click()

        await expect(page).toHaveTitle("Newest 'typescript' Questions - Stack Overflow");
        await expect(page.url()).toContain('/questions/tagged/typescript')
        await expect(page.getByPlaceholder('Search…')).toHaveValue('[typescript]')
      })
})