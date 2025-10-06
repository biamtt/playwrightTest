import {Page} from "@playwright/test";
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
        await this.page.locator(LoginSelectors.usernameInput).fill(username);
    }

    /**
     * Enter the password
     * @param password
     */
    async enterPassword(password: string) {
        await this.page.locator(LoginSelectors.passwordInput).fill(password);
    }

    /**
     * Click the login button
     */
    async clickLoginButton() {
        await this.page.locator(LoginSelectors.loginButton).click();
    }

    /**
     * Get the error message on the Login page
     */
    async getErrorMessage(): Promise<string> {
        const text = await this.page.locator(LoginSelectors.errorMessage).textContent();
        return text?.trim() || '';
    }

    /**
     * Perform successful login
     * @param username
     * @param password
     */
    async performSuccessLogin(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
        await this.page.waitForURL('https://www.saucedemo.com/inventory.html');
        return new InventoryPage(this.page);
    }

    /**
     * Perform failed login and validate the error message
     * @param username
     * @param password
     */
    async performFailedLogin(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
        return this;
    }


}