import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    expect: {
        timeout: 6000
    },
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['list'],
        ['allure-playwright', {
            outputFolder: 'allure-results',
            suiteTitle: true,
        }]
    ],
    use: {
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'ui-tests',
            use: {
                ...devices['Desktop Chrome'],
            },
            testMatch: /.*e2e.*\.spec\.js/
        },
        {
            name: 'api-tests',
            use: {
                baseURL: 'https://petstore.swagger.io/v2',
                extraHTTPHeaders: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            },
            testMatch: /.*api.*\.spec\.js/
        }
    ]
});
