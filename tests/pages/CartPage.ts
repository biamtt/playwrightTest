import {Page} from 'playwright';
import {CartSelectors} from "../selectors/cartSelectors";
import {expect} from "playwright/test";

export class CartPage {
    constructor(private page: Page) {
    }

    /**
     * Validate the cart page title
     * @returns
     */
    async validateCartPageTitle(): Promise<string> {
        const text = await this.page.locator(CartSelectors.cartTitlePage).textContent();
        return text?.trim() || '';
    }

    /**
     * Validate the cart item count
     * @param expectedCount
     */
    async validateCartItemCount(expectedCount:number): Promise<void> {
        await expect(this.page.locator(CartSelectors.cartItem)).toHaveCount(expectedCount);
    }

    /**
     * Remove an item from the cart
     * @param itemName
     */
    async removeItemFromCart(itemName: string): Promise<CartPage> {
        const item = this.page.locator(CartSelectors.cartItem).filter({hasText: itemName});
        await item.locator(CartSelectors.cartItemRemoveButton).click();
        return this;
    }

    /**
     * Press the Continue shopping button to redirect to the inventory page
     */
    async continueShopping(): Promise<void> {
        await this.page.locator(CartSelectors.cartContinueShoppingButton).click()
        expect(this.page.waitForURL('https://www.saucedemo.com/inventory.html'));
    }
}