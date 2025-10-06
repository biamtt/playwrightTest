import {Page} from "@playwright/test";

export async function launchPage(page: Page) {
    await page.goto('https://www.saucedemo.com/');
}