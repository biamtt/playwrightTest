import {Page} from 'playwright';
import {InventorySelectors} from "../selectors/inventorySelectors";
import {LoginPage} from "./LoginPage";
import {CartPage} from "./CartPage";

export class InventoryPage {
    constructor(private page: Page) {
    }

    /**
     * Access the cart page
     */
    async accessCartPage(){
        await this.page.locator(InventorySelectors.cartButton).click();
        await this.page.waitForURL('https://www.saucedemo.com/cart.html');
        return new CartPage(this.page);
    }

    /**
     * Validate the inventory page title
     * @returns
     */
    async getInventoryTitle(): Promise<string> {
        const text = await this.page.locator(InventorySelectors.inventoryTitle).textContent();
        return text?.trim() || '';
    }

    /**
     * Add an item to the cart
     * @param itemName
     */
    async addItemToCart(itemName: string): Promise<InventoryPage> {
        const item = this.page.locator(InventorySelectors.itemDiv).filter({hasText: itemName});
        await item.locator(InventorySelectors.addToCartButton).click();
        return this;
    }

    /**
     * Logout from the application
     * @returns LoginPage
     */
    async logout(): Promise<LoginPage> {
        await this.page.locator(InventorySelectors.expandMenuButton).click();
        await this.page.locator(InventorySelectors.logoutButton).click();
        await this.page.waitForURL('https://www.saucedemo.com/');
        return new LoginPage(this.page);
    }

}