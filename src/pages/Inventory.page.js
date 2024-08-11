/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
/* eslint-disable class-methods-use-this */
import { expect } from '@playwright/test';
// @ts-check
import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.locator('.title');

    inventoryItems = this.page.locator('.inventory_item');

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    sortSelect = this.page.getByTestId('product-sort-container');

    inventoryItemPrice = this.page.getByTestId('inventory-item-price');

    inventoryItemTitle = this.page.getByTestId('inventory-item-name');

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }

    async selectSortOption(type) {
        await this.sortSelect.selectOption({ label: `${type}` });
    }

    async getProductsNames() {
        const productNames = await this.page.locator('[class^="inventory_item_name"]').allInnerTexts();
        return productNames.map((element) => element.trim());
    }

    async getProductPrices() {
        const productPrices = await this.page.locator('[class^="inventory_item_price"]').allInnerTexts();
        return productPrices.map((element) => parseFloat(element.replace('$', '').trim()));
    }

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
}
