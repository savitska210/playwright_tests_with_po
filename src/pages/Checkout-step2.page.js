/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
// @ts-check
import { BasePage } from './Base.page';

export class CheckoutStep2Page extends BasePage {
    url = '/checkout-step-two.html';

    root = this.page.getByTestId('cart-list');

    cartItemSelector = '.cart_item';

    cartItems = this.root.locator(this.cartItemSelector);

    cartInventoryItemPrice = this.root.getByTestId('inventory-item-price');

    cartInventoryItemTitle = this.root.getByTestId('inventory-item-name');

    cartInventoryItemDesc = this.root.getByTestId('inventory-item-desc');

    cartItemQuantity = this.root.getByTestId('item-quantity');

    subTotal = this.page.getByTestId('subtotal-label');

    total = this.page.getByTestId('total-label');

    async getAllCartItems() {
        const array = await this.cartItems.all();
        return array;
    }

    async getAllCartProducts() {
        const allProducts = await this.getAllCartItems();
        const products = [];
        for await (const element of allProducts) {
            const title = await element.getByTestId('inventory-item-name').innerText();
            const desc = await element.getByTestId('inventory-item-desc').innerText();
            const price = await element.getByTestId('inventory-item-price').innerText();
            const quantity = parseInt(await element.getByTestId('item-quantity').innerText());
            const numberPrice = parseFloat(price.replace('$', ''));
            const totalProductSum = parseFloat((quantity * numberPrice).toFixed(2));
            products.push({
                title, desc, price, quantity, totalProductSum,
            });
        }
        return products;
    }
}
