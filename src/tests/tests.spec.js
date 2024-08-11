import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { users } from '../test_data/users';

test.describe('Tests Unit 10', () => {
    test.beforeEach(async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const { username, password } = users.standardUser;
        await app.login.navigate();
        await app.login.performLogin(username, password);
        await expect(app.inventory.headerTitle).toBeVisible();
        console.log(`Running ${test.info().title}...`);
    });
    test.afterEach(async ({ }, testInfo) => {
        console.log(`Test Result: ${testInfo.status}`);
    });

    const dataSortType = [
        {
            sortBy: 'Name (A to Z)',
        },
        {
            sortBy: 'Name (Z to A)',
        },
        {
            sortBy: 'Price (low to high)',
        },
        {
            sortBy: 'Price (high to low)',
        },
    ];

    dataSortType.forEach((data) => {
        test(`Sort By ${data.sortBy}`, async (
            /** @type {{ app: import('../pages/Application').Application }} */{ app },
        ) => {
            const productNames = await app.inventory.getProductsNames();
            const productPrices = await app.inventory.getProductPrices();
            await app.inventory.selectSortOption(data.sortBy);
            if (data.sortBy === 'Name (A to Z)') {
                const sortedProductNames = await app.inventory.getProductsNames();
                const expectedProductNames = [...productNames].sort();
                expect(sortedProductNames).toEqual(expectedProductNames);
            }
            if (data.sortBy === 'Name (Z to A)') {
                const sortedProductNames = await app.inventory.getProductsNames();
                const expectedProductNames = [...productNames].sort((a, b) => b.localeCompare(a));
                expect(sortedProductNames).toEqual(expectedProductNames);
            }
            if (data.sortBy === 'Price (low to high)') {
                const sortedProductPrices = await app.inventory.getProductPrices();
                const expectedProductPrices = [...productPrices].sort((a, b) => a - b);
                expect(sortedProductPrices).toEqual(expectedProductPrices);
            }
            if (data.sortBy === 'Price (high to low)') {
                const sortedProductPrices = await app.inventory.getProductPrices();
                const expectedProductPrices = [...productPrices].sort((a, b) => b - a);
                expect(sortedProductPrices).toEqual(expectedProductPrices);
            }
        });
    });
});
