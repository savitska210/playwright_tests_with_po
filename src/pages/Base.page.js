// @ts-check
import { Header } from './components/header';

export class BasePage {
    url = '';

    /**
     * @param {import("playwright-core").Page} page
     */
    constructor(page) {
        this.page = page;
        this.header = new Header(this.page);
        this.headingTitle = this.page.locator('.title');
    }

    // async below added to show the function returns a promise
    async getUrl() {
        return this.page.url();
    }

    async navigate() {
        await this.page.goto(this.url);
    }
}
