import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/stepdefs',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ["allure-playwright", {resultsDir: "tests/test-results/allure-results"}],
    ],
    outputDir: "tests/test-results/traces",
    use: {
        baseURL: "https://www.imdb.com/",
        headless: !!process.env.CI,
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
        },

        {
            name: 'firefox',
            use: {...devices['Desktop Firefox']},
        },

        {
            name: 'webkit',
            use: {...devices['Desktop Safari']},
        },
    ],
})
