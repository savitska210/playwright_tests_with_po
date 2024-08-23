// @ts-check
// eslint-disable-next-line max-classes-per-file
import { LoginPage } from './Login.page';
import { InventoryPage } from './Inventory.page';
import { ShoppingCartPage } from './ShoppingCart.page';
import { CheckoutStep1Page } from './Checkout-step1.page';
import { CheckoutStep2Page } from './Checkout-step2.page';
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

    inventory = new InventoryPage(this.page);

    /**
     * @type {ShoppingCartPage}
     */

    shoppingCart = new ShoppingCartPage(this.page);

    /**
     * @type {CheckoutStep1Page}
     */

    checkoutStep1 = new CheckoutStep1Page(this.page);

    /**
     * @type {CheckoutStep2Page}
     */

    checkoutStep2 = new CheckoutStep2Page(this.page);
}
