import {launchPage} from "../utils/commands";
import {test, expect} from "../fixtures/pageFixtures";

test.describe("Testing the Login Feature", () => {
    test.beforeEach(async ({page}) => {
        await launchPage(page);
    })

    test("Verify successful login with valid credentials", async ({loginPage, credentials, translation}) => {
        const inventoryPage = await loginPage.performSuccessLogin(credentials.validUser, credentials.defaultPassword);
        const title = await inventoryPage.getInventoryTitle();
        expect(title).toBe(translation.en.inventoryPage.title);
        await inventoryPage.logout();
    })

    test("Verify login with locked user", async ({loginPage, credentials, translation}) => {
        await loginPage.performFailedLogin(credentials.lockedUser, credentials.defaultPassword)
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe(translation.en.errorMessage.lockedOutUser)
    })

    test("Verify login with invalid password", async ({loginPage, credentials, translation}) => {
        await loginPage.performFailedLogin(credentials.validUser, credentials.invalidPassword);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe(translation.en.errorMessage.invalidCredentials)
    })

    test("Verify login with invalid username", async ({loginPage, credentials, translation}) => {
        await loginPage.performFailedLogin(credentials.invalidUser, credentials.defaultPassword);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe(translation.en.errorMessage.invalidCredentials)
    })

    test("Verify login with empty username", async ({loginPage, credentials, translation}) => {
        await loginPage.performFailedLogin('', credentials.defaultPassword);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe(translation.en.errorMessage.usernameRequired)
    })

    test("Verify login with empty password", async ({loginPage, credentials, translation}) => {
        await loginPage.performFailedLogin(credentials.validUser, '');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe(translation.en.errorMessage.passwordRequired)
    })

    test("Verify login without credentials", async ({loginPage, translation}) => {
        await loginPage.performFailedLogin('', '');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe(translation.en.errorMessage.usernameRequired)
    })

    test("Verify user still logged in after page refresh", async ({loginPage, credentials, translation}) => {
        const inventoryPage = await loginPage.performSuccessLogin(credentials.validUser, credentials.defaultPassword);
        await inventoryPage.page.reload();
        const title = await inventoryPage.getInventoryTitle();
        expect(title).toBe(translation.en.inventoryPage.title);
        await inventoryPage.logout();
    })
})