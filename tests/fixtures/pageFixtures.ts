import { test as base} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import testData from "../fixtures/data/testData.json"
import translation from "../fixtures/i18n/translation.json"

type MyFixtures = {
    loginPage: LoginPage;
    credentials: typeof testData.credentials;
    translation: typeof translation;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    credentials: async ({}, use) => {
        await use(testData.credentials);
    },
    translation: async ({}, use) => {
        await use(translation);
    }
});

export {expect} from '@playwright/test';