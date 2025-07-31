import { test } from "../fixtures/baseFixture";
import { expect } from "@playwright/test";

test.describe("imdb UI steps", () => {
    test("Search and Validate the movie",
        async ({homePage, searchPage}) => {
            await homePage.searchField.fill("inception")
            await homePage.searchField.press("Enter")
            expect(await (await searchPage.searchKeyword("inception")).textContent()).toBe(`Search \"inception\"`)

            const result = await searchPage.getResult()
            const invalidTitles = result.filter(title => !title.includes("Inception"))

            expect(
                invalidTitles,
                `Some of titles don't have expected keyword:` +
                `Expected: ${JSON.stringify(result, null, 2)}\n` +
                `Actual: ${JSON.stringify(invalidTitles, null, 2)}`
            ).toEqual([])
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
})