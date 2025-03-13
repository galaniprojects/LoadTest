import { Page, expect } from '@playwright/test';


export async function helloWorld(page: Page) {
    await page.goto('https://galaniprojects.de/eng.html');
    await page.getByRole('link', { name: 'Our Expertise' }).click();
    await expect(page.getByRole('heading', { name: 'Expertise' })).toBeVisible();
}
