import {Page, expect, test} from "@playwright/test";
import {InventorySelectors} from "../selectors/inventorySelectors";
import {LoginPage} from "./LoginPage";
import {CartPage} from "./CartPage";


export class InventoryPage {
    constructor(public page: Page) {
    }

    /**
     * Access the cart page
     * @returns CartPage
     */
    async accessCartPage(): Promise<CartPage> {
        await test.step("Clicking on the cart button and validating page navigation", async () => {
            await this.page.locator(InventorySelectors.cartButton).click();
            await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
        })
        return new CartPage(this.page);
    }

    /**
     * Validate the inventory page title
     * @param expectedTitle
     * @returns InventoryPage
     */
    async validateInventoryTitlePage(expectedTitle: string): Promise<InventoryPage> {
        await test.step('Validate the inventory page title', async () => {
            await expect(this.page.locator(InventorySelectors.inventoryTitle)).toHaveText(expectedTitle);
        })
        return this;
    }

    /**
     * Add an item to the cart
     * @param itemName
     * @returns InventoryPage
     */
    async addItemToCart(itemName: string): Promise<InventoryPage> {
        await test.step(`Adding item "${itemName} to the cart`, async () => {
            const item = this.page.locator(InventorySelectors.itemDiv).filter({hasText: itemName});
            await item.locator(InventorySelectors.addToCartButton).click();
        })
        return this;
    }

    /**
     * Logout from the application
     * @returns LoginPage
     */
    async logout(): Promise<LoginPage> {
        await test.step("Clicking on the logout button and validating page navigation", async () => {
            await this.page.locator(InventorySelectors.expandMenuButton).click();
            await this.page.locator(InventorySelectors.logoutButton).click();
            await this.page.waitForURL('https://www.saucedemo.com/');
        })
        return new LoginPage(this.page);
    }
}