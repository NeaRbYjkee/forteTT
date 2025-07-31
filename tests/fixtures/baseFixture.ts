import { test as base } from '@playwright/test'
import { HomePage } from "../pages/homePage"
import { SearchPage } from "../pages/searchPage"

type MyFixtures = {
    homePage: HomePage,
    searchPage: SearchPage
}

export const test = base.extend<MyFixtures>(
    {
        homePage: async ({page}, use) => {
            await page.goto('/')
            await use(new HomePage(page))
        },
        searchPage: async ({page}, use) => {
            await use(new SearchPage(page))
        }
    })