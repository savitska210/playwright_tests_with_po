/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-case-declarations */
import { expect } from '@playwright/test';
// @ts-check
import { BasePage } from './Base.page';
import { getRandomProducts } from '../utils/helpers';

export class InventoryPage extends BasePage {
    url = '/inventory.html';

    inventoryItems = this.page.locator('.inventory_item');

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    sortSelect = this.page.getByTestId('product-sort-container');

    inventoryItemPrice = this.page.getByTestId('inventory-item-price');

    inventoryItemTitle = this.page.getByTestId('inventory-item-name');

    inventoryItemDesc = this.page.getByTestId('inventory-item-desc');

    // Adding Item to the cart by id per page
    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }

    // Selecting kind of sorting by Type
    async selectSortOption(type) {
        await this.sortSelect.selectOption({ label: `${type}` });
    }

    // get array of all Products names
    async getProductsNames() {
        const productNames = await this.page.locator('[class^="inventory_item_name"]').allInnerTexts();
        return productNames.map((element) => element.trim());
    }

    // get array of all Products prices
    async getProductPrices() {
        const productPrices = await this.page.locator('[class^="inventory_item_price"]').allInnerTexts();
        return productPrices.map((element) => parseFloat(element.replace('$', '').trim()));
    }

    // testing products sorting feature
    async sortInventoriesTest(sortBy, productNames, productPrices) {
        switch (sortBy) {
            case 'Name (A to Z)':
                const sortedNamesAZ = await this.getProductsNames();
                const expectedNamesAZ = productNames.sort();
                expect(sortedNamesAZ).toEqual(expectedNamesAZ);
                break;
            case 'Name (Z to A)':
                const sortedNamesZA = await this.getProductsNames();
                const expectedNamesZA = productNames.sort((a, b) => b.localeCompare(a));
                expect(sortedNamesZA).toEqual(expectedNamesZA);
                break;
            case 'Price (low to high)':
                const sortedPricesLowHigh = await this.getProductPrices();
                const expectedPricesLowHigh = productPrices.sort((a, b) => a - b);
                expect(sortedPricesLowHigh).toEqual(expectedPricesLowHigh);
                break;
            case 'Price (high to low)':
                const sortedPricesHighLow = await this.getProductPrices();
                const expectedPricesHighLow = productPrices.sort((a, b) => b - a);
                expect(sortedPricesHighLow).toEqual(expectedPricesHighLow);
                break;
            default:
                throw new Error('Sort option is not correct');
        }
    }

    // get all Products locators
    async getAllProducts() {
        const array = await this.inventoryItems.all();
        return array;
    }

    // adding random products to the cart
    async addRandomProductsToCart() {
        const allProducts = await this.getAllProducts();
        const randomProducts = getRandomProducts(allProducts, 2);
        const products = [];
        for await (const element of randomProducts) {
            const title = await element.getByTestId('inventory-item-name').innerText();
            const desc = await element.getByTestId('inventory-item-desc').innerText();
            const price = await element.getByTestId('inventory-item-price').innerText();
            products.push({ title, desc, price });
            await element.locator('[id^="add-to-cart"]').click();
        }
        return products;
    }
}
