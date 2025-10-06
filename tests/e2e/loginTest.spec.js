import {launchPage} from "../utils/commands";
import {test} from "../fixtures/pageFixtures";

test.describe("Testing the Login Feature", () => {
    test.beforeEach(async ({page}) => {
        await launchPage(page);
    })

    test("Verify successful login with valid credentials", async ({loginPage, credentials, translation}) => {
        const inventoryPage = await loginPage.performSuccessLogin(credentials.validUser, credentials.defaultPassword);
        await inventoryPage.validateInventoryTitlePage(translation.en.inventoryPage.title)
        await inventoryPage.logout();
    })

    test("Verify login with locked user", async ({loginPage, credentials, translation}) => {
        await loginPage.performFailedLogin(credentials.lockedUser, credentials.defaultPassword)
        await loginPage.validateErrorMessage(translation.en.errorMessage.lockedOutUser)
    })

    test("Verify login with invalid password", async ({loginPage, credentials, translation}) => {
        await loginPage.performFailedLogin(credentials.validUser, credentials.invalidPassword);
        await loginPage.validateErrorMessage(translation.en.errorMessage.invalidCredentials);
    })

    test("Verify login with invalid username", async ({loginPage, credentials, translation}) => {
        await loginPage.performFailedLogin(credentials.invalidUser, credentials.defaultPassword);
        await loginPage.validateErrorMessage(translation.en.errorMessage.invalidCredentials);
    })

    test("Verify login with empty username", async ({loginPage, credentials, translation}) => {
        await loginPage.performFailedLogin('', credentials.defaultPassword);
        await loginPage.validateErrorMessage(translation.en.errorMessage.usernameRequired);
    })

    test("Verify login with empty password", async ({loginPage, credentials, translation}) => {
        await loginPage.performFailedLogin(credentials.validUser, '');
        await loginPage.validateErrorMessage(translation.en.errorMessage.passwordRequired);
    })

    test("Verify login without credentials", async ({loginPage, translation}) => {
        await loginPage.performFailedLogin('', '');
        await loginPage.validateErrorMessage(translation.en.errorMessage.usernameRequired);
    })

    test("Verify user still logged in after page refresh", async ({loginPage, credentials, translation}) => {
        const inventoryPage = await loginPage.performSuccessLogin(credentials.validUser, credentials.defaultPassword);
        await inventoryPage.page.reload();
        await inventoryPage.validateInventoryTitlePage(translation.en.inventoryPage.title);
        await inventoryPage.logout();
    })
})