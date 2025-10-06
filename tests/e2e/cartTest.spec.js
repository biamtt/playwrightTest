import {launchPage} from "../utils/commands";
import {test} from "../fixtures/pageFixtures";

test.describe("Testing the Cart Feature", () => {
    test.beforeEach(async ({page}) => {
        await launchPage(page);
    })

    test("Verify cart page availability", async ({loginPage, credentials, translation}) => {
        const inventoryPage = await loginPage.performSuccessLogin(credentials.validUser, credentials.defaultPassword);
        const cartPage = await inventoryPage.accessCartPage()
        await cartPage.validateCartPageTitle(translation.en.cartPage.title)
        await inventoryPage.logout();
    })

    test("Verify add multiple items to the cart", async ({loginPage, credentials, translation}) => {
        const inventoryPage = await loginPage.performSuccessLogin(credentials.validUser, credentials.defaultPassword)
        await inventoryPage.addItemToCart(translation.en.inventoryPage.item0)
        await inventoryPage.addItemToCart(translation.en.inventoryPage.item1)
        await inventoryPage.addItemToCart(translation.en.inventoryPage.item2)
        const cartPage = await inventoryPage.accessCartPage()
        await cartPage.validateCartItemCount(3)
        await inventoryPage.logout();
    })

    test("Verify remove one item from cart", async ({loginPage, credentials, translation}) => {
        const inventoryPage = await loginPage.performSuccessLogin(credentials.validUser, credentials.defaultPassword)
        await inventoryPage.addItemToCart(translation.en.inventoryPage.item0)
        await inventoryPage.addItemToCart(translation.en.inventoryPage.item1)
        const cartPage = await inventoryPage.accessCartPage()
        await cartPage.validateCartItemCount(2)
        await cartPage.removeItemFromCart(translation.en.inventoryPage.item0)
        await cartPage.validateCartItemCount(1)
        await inventoryPage.logout();
    })

    test("Verify continue shopping button page redirection", async ({loginPage, credentials, translation}) => {
        const inventoryPage = await loginPage.performSuccessLogin(credentials.validUser, credentials.defaultPassword)
        await inventoryPage.addItemToCart(translation.en.inventoryPage.item0)
        await inventoryPage.addItemToCart(translation.en.inventoryPage.item1)
        const cartPage = await inventoryPage.accessCartPage()
        await cartPage.validateCartItemCount(2)
        await cartPage.continueShopping()
        await inventoryPage.logout();
    })
})