import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

test.describe('Sort Inventories', () => {
    test.beforeEach(async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');
        await expect(app.inventory.headerTitle).toBeVisible();
        console.log(`Running ${test.info().title}...`);
    });
    test.afterEach(async ({ }, testInfo) => {
        console.log(`Test Result: ${testInfo.status}`);
    });

    test('Sort By Name A-Z', async (/** @type {{ app: import('../pages/Application').Application }} */{ app }) => {
        const productNames = await app.inventory.getProductsNames();
        await app.inventory.selectSortType('az');
        const sortedProductNames = await app.inventory.getProductsNames();
        const expectedProductNames = [...productNames].sort();
        expect(sortedProductNames).toEqual(expectedProductNames);
    });

    test('Sort By Name Z-A', async (/** @type {{ app: import('../pages/Application').Application }} */{ app }) => {
        const productNames = await app.inventory.getProductsNames();
        await app.inventory.selectSortType('za');
        const sortedProductNames = await app.inventory.getProductsNames();
        const expectedProductNames = [...productNames].sort((a, b) => b.localeCompare(a));
        expect(sortedProductNames).toEqual(expectedProductNames);
    });

    // eslint-disable-next-line playwright/expect-expect
    test('Sort By Price Low -> High', async (/** @type {{ app: import('../pages/Application').Application }} */{ app }) => {
        const productPrices = await app.inventory.getProductPrices();
        await app.inventory.selectSortType('lohi');
        const sortedProductPrices = await app.inventory.getProductPrices();
        const expectedProductPrices = [...productPrices].sort((a, b) => a - b);
        expect(sortedProductPrices).toEqual(expectedProductPrices);
    });

    test('Sort By Price High -> Low', async (/** @type {{ app: import('../pages/Application').Application }} */{ app }) => {
        const productPrices = await app.inventory.getProductPrices();
        await app.inventory.selectSortType('hilo');
        const sortedProductPrices = await app.inventory.getProductPrices();
        const expectedProductPrices = [...productPrices].sort((a, b) => b - a);
        expect(sortedProductPrices).toEqual(expectedProductPrices);
    });
});
