import {Page, expect, test} from "@playwright/test";
import {LoginSelectors} from "../selectors/loginSelectors";
import {InventoryPage} from "./InventoryPage";

export class LoginPage {
    constructor(private page: Page) {
    }

    /**
     * Enter the username
     * @param username
     */
    async enterUsername(username: string) {
        await test.step(`Entering username: ${username}`, async () => {
            await this.page.locator(LoginSelectors.usernameInput).fill(username);
        })
    }

    /**
     * Enter the password
     * @param password
     */
    async enterPassword(password: string) {
        await test.step(`Entering password: ${password}`, async () => {
            await this.page.locator(LoginSelectors.passwordInput).fill(password);
        })
    }

    /**
     * Click the login button
     */
    async clickLoginButton() {
        await test.step(`Clicking on the login button`, async () => {
            await this.page.locator(LoginSelectors.loginButton).click();
        })
    }

    /**
     * Get the error message on the Login page
     * @param expectedMessage
     * @returns LoginPage
     */
    async validateErrorMessage(expectedMessage: string): Promise<LoginPage> {
        await test.step(`Validating error message - expected "${expectedMessage}"`, async () => {
            await expect(this.page.locator(LoginSelectors.errorMessage)).toHaveText(expectedMessage);
        })
        return this;
    }

    /**
     * Perform successful login
     * @param username
     * @param password
     * @returns InventoryPage
     */
    async performSuccessLogin(username: string, password: string): Promise<InventoryPage> {
        await test.step(`Performing successful login`, async () => {
            await this.enterUsername(username);
            await this.enterPassword(password);
            await this.clickLoginButton();
            await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
        })
        return new InventoryPage(this.page);
    }

    /**
     * Perform failed login and validate the error message
     * @param username
     * @param password
     */
    async performFailedLogin(username: string, password: string): Promise<LoginPage> {
        await test.step(`Performing failed login attempt`, async () => {
            await this.enterUsername(username);
            await this.enterPassword(password);
            await this.clickLoginButton();
        })
        return this;
    }
}