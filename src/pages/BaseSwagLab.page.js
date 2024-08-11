// @ts-check

import { BasePage } from './Base.page';

export class BaseSwagLabPage extends BasePage {
    // header
    mainMenuBtn = this.page.locator('TBD');

    shoppingCart = this.page.locator('.shopping_cart_link');

    shoppingCartBadge = this.page.locator('.shopping_cart_badge');

    async getNumberOfItemsInCart() {
        return this.shoppingCartBadge.textContent();
    }
}
