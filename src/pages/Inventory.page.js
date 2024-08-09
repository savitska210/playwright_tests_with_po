// @ts-check
import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.locator('.title');

    inventoryItems = this.page.locator('.inventory_item');

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    sortSelect = this.page.locator('[data-test="product-sort-container"]');

    inventoryItemPrice = this.page.locator('[data-test="inventory-item-price"]');

    inventoryItemTitle = this.page.locator('[data-test="inventory-item-name"]');

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }

    async selectSortType(sortType) {
        await this.sortSelect.selectOption(sortType);
    }

    async getProductsNames() {
        const productNames = await this.page.$$eval('inventoryItemTitle', (elements) => elements.map((element) => element.textContent?.trim()));
        return productNames;
    }

    async getProductPrices() {
        // @ts-ignore
        const productPrices = await this.page.$$eval('inventoryItemPrice', (elements) => elements.map((element) => parseFloat(element.textContent?.replace('$', '').trim())));
        return productPrices;
    }
}
