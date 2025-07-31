import { BasePage } from "./basePage";

export class HomePage extends BasePage {
    get searchField() {
        return this.page.getByTestId('suggestion-search')
    }

    get menuButton() {
        return this.page.getByLabel('Open navigation drawer')
    }

    get top250Button() {
        return this.page.getByLabel('Go to Top 250 movies')
    }
}