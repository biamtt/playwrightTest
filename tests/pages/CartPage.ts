import {Page, expect, test} from '@playwright/test';
import {CartSelectors} from "../selectors/cartSelectors";
import {InventoryPage} from "./InventoryPage";

export class CartPage {
    constructor(private page: Page) {
    }

    /**
     * Validate the cart page title
     * @returns CartPage
     */
    async validateCartPageTitle(expectedTitle: string): Promise<CartPage> {
        await test.step('Validate the cart page title', async () => {
            await expect(this.page.locator(CartSelectors.cartTitlePage)).toHaveText(expectedTitle);
        })
        return this;
    }

    /**
     * Validate the cart item count
     * @param expectedCount
     * @returns CartPage
     */
    async validateCartItemCount(expectedCount: number): Promise<CartPage> {
        await test.step(`Validate the cart item count is: ${expectedCount}`, async () => {
            await expect(this.page.locator(CartSelectors.cartItem)).toHaveCount(expectedCount);
        })
        return this;
    }

    /**
     * Remove an item from the cart
     * @param itemName
     * @returns CartPage
     */
    async removeItemFromCart(itemName: string): Promise<CartPage> {
        await test.step(`Removing item "${itemName}"`, async () => {
            const item = this.page.locator(CartSelectors.cartItem).filter({hasText: itemName});
            await item.locator(CartSelectors.cartItemRemoveButton).click();
        })
        return this;
    }

    /**
     * Press the Continue shopping button to redirect to the inventory page
     * @returns InventoryPage
     */
    async continueShopping(): Promise<InventoryPage> {
        await test.step("Clicking on Continue Shopping button and validating page navigation", async () => {
            await this.page.locator(CartSelectors.cartContinueShoppingButton).click()
            await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
        })
        return new InventoryPage(this.page);
    }
}