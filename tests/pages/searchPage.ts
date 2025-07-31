import { BasePage } from "./basePage";
import { Locator } from "@playwright/test";

export class SearchPage extends BasePage {
    get getTheFirstMovie() {
        return this.page.locator('li').filter({
            has: this.page.getByRole('heading')
        }).first()
    }

    async getMovieTitle(movieLocator: Locator) {
        return movieLocator.getByRole('heading')
    }


    async getMovieRatingLocator(movieLocator: Locator) {
        return movieLocator.getByTestId('ratingGroup--imdb-rating')
    }

    async getMovieYearLocator(movieLocator: Locator) {
        return movieLocator.getByText(/^\d{4}$/)
    }

    async searchKeyword(keyword: string) {
        return this.page.getByRole('heading', {name: `Search "${keyword}"`})
    }

    async getResult() {
        const result = await this.page
            .getByTestId('find-results-section-title')
            .getByRole('link')
            .all()
        const listOfTitles = []
        for (const item of result) {
            if ((await item.getAttribute('href')).startsWith('/title/')) {
                listOfTitles.push((await item.textContent()).trim())
            }
        }
        return listOfTitles
    }
}