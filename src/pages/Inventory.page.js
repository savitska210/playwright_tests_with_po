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
        const productNames = (await this.page.locator('[class^="inventory_item_name"]').allInnerTexts()).map((element) => element.trim());
        return productNames;
    }

    async getProductPrices() {
        const productPrices = (await this.page.locator('[class^="inventory_item_price"]').allInnerTexts()).map((element) => parseFloat(element.replace('$', '').trim()));
        return productPrices;
    }
}
