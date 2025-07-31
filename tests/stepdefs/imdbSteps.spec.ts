import { test } from "../fixtures/baseFixture"
import { expect } from "@playwright/test"
import cases from "../fixtures/cases"

test.describe("Search and Validate the movie", () => {
    cases.testCases.forEach((testCase) => {
        test(`Search keyword: ${testCase}`,
            async ({homePage, searchPage}) => {
                await homePage.searchField.fill(testCase)
                await homePage.searchField.press("Enter")
                expect(await (await searchPage.searchKeyword(testCase)).textContent()).toBe(`Search \"${testCase}\"`)

                const result = await searchPage.getResult()
                const invalidTitles = result.filter(
                    title => !title.toLowerCase().includes(testCase.toLowerCase())
                )

                expect(
                    invalidTitles,
                    `Some of titles don't have expected keyword:` +
                    `Expected: ${JSON.stringify(result, null, 2)}\n` +
                    `Actual: ${JSON.stringify(invalidTitles, null, 2)}`
                ).toEqual([])
            })
    })
})

test("Navigate Top 250 Movies",
    async ({homePage, searchPage}) => {
        await homePage.menuButton.click()
        await homePage.top250Button.click()
        const firstMovieLocator = searchPage.getTheFirstMovie
        await expect(await searchPage.getMovieTitle(firstMovieLocator)).toBeVisible()
        await expect(await searchPage.getMovieRatingLocator(firstMovieLocator)).toBeVisible()
        await expect(await searchPage.getMovieYearLocator(firstMovieLocator)).toBeVisible()
    }
)
