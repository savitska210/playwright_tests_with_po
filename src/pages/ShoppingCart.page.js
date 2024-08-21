// @ts-check
import { BasePage } from './Base.page';

export class ShoppingCartPage extends BasePage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    root = this.page.getByTestId('cart-list');

    cartItems = this.root.locator(this.cartItemSelector);

    removeItemSelector = '[id^="remove"]';

    cartInventoryItems = this.page.locator('.inventory_item');

    cartInventoryItemPrice = this.root.getByTestId('inventory-item-price');

    cartInventoryItemTitle = this.root.getByTestId('inventory-item-name');

    cartInventoryItemDesc = this.root.getByTestId('inventory-item-desc');

    buttonCheckout = this.page.getByTestId('checkout');

    // get all Products locators in the Cart
    async getAllCartProducts() {
        const array = await this.cartInventoryItems.all();
        return array;
    }

    // async below added to show the function returns a promise
    async getCartItemByName(name) {
        return this.page.locator(this.cartItemSelector, { hasText: name });
    }

    // removing product from the cart by name
    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    // removing product from the cart by id
    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }

    // go to Checkout from Shopping Cart
    async gotoCheckoutFromCart() {
        await this.buttonCheckout.click();
    }

    async removeAllItems() {
        while (await this.cartItems.count() > 0) {
            const firstItem = this.cartItems.first();
            const removeButton = firstItem.locator(this.removeItemSelector);
            await removeButton.click();
        }
    }
}
