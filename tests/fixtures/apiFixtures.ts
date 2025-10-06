import {test as base, expect, APIResponse} from "@playwright/test";
import {ApiClient} from "../utils/apiClient";
import petData from "../fixtures/data/api/petData.json"
import storeData from "../fixtures/data/api/storeData.json"

type ApiFixtures = {
    apiClient: ApiClient;
    petData: typeof petData;
    storeData: typeof storeData;
}

export const test = base.extend<ApiFixtures>({
    apiClient: async ({request}, use) => {
        const baseURL = 'https://petstore.swagger.io/v2';
        const apiClient = new ApiClient(request, baseURL);
        await use(apiClient);
    },
    petData: async ({}, use) => {
        await use(petData);
    },
    storeData: async ({}, use) => {
        await use(storeData);
    }
});
export {expect, APIResponse}