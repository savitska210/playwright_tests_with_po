// @ts-check
// eslint-disable-next-line max-classes-per-file
import { LoginPage } from './Login.page';
import { InventoryPage } from './Inventory.page';
import { ShoppingCartPage } from './ShoppingCart.page';

/**
 * Represents a Playwright page.
 */
class Page {
    /**
     * Creates an instance of PlaywrightPage.
     * @param {import("playwright-core").Page} page - The Playwright page instance.
     */
    constructor(page) {
        this.page = page;
    }
}

/**
 * Represents the application under test.
 * @extends Page
 */
export class Application extends Page {
    /**
     * @type {LoginPage}
     */
    login = new LoginPage(this.page);

    /**
     * @type {InventoryPage}
     */
    // @ts-ignore
    inventory = new InventoryPage(this.page);

    /**
     * @type {ShoppingCartPage}
     */
    // @ts-ignore
    shoppingCart = new ShoppingCartPage(this.page);
}
