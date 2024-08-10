/* eslint-disable playwright/no-conditional-expect */
/* eslint-disable playwright/no-conditional-in-test */
/* eslint-disable linebreak-style */

import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { users } from '../test_data/users';

test.describe('Tests Unit 10', () => {
    test.beforeEach(async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const user = users.find((u) => u.username === 'standard_user');
        await app.login.navigate();
        await app.login.performLogin(user.username, user.password);
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
            await app.inventory.sortInventoriesTest(data.sortBy, productNames, productPrices);
        });
    });
});
