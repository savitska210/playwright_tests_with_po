/* eslint-disable no-console */
/* eslint-disable playwright/expect-expect */
/* eslint-disable no-restricted-syntax */
import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { users } from '../test_data/users';

test.describe('Tests Unit 10', () => {
    test.beforeEach(async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const { username, password } = users.standardUser;
        // Log in
        await app.login.navigate();
        await app.login.performLogin(username, password);
        // Verify success login perform
        await expect(app.inventory.headingTitle).toBeVisible();
        console.log(`Running ${test.info().title}...`);
    });

    test.afterEach(async ({ }, testInfo) => {
        console.log(`Test Result: ${testInfo.status}`);
    });

    // Sorting types
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

    // Running test sort for every type
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

    // test adding to the cart 2 random product from inventory page
    test('Adding several random products to the cart', async (
    /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        // Adding 2 random products to the cart
        const products = await test.step('Verify count of product in the cart  (on the cart badge at the header)', async () => {
            const addedProducts = app.inventory.addRandomProductsToCart();
            // Verify count of product in the cart  (on the cart badge at the header)
            await expect(app.inventory.header.shoppingCartBadge, 'Verify count of product in the cart  (on the cart badge at the header)').toHaveText('2');
            return addedProducts;
        });

        // go to the Shopping cart page
        await app.inventory.header.navigateToCartFromHeader();

        await test.step('Verify count of products at the Shopping cart page', async () => {
            await expect(app.shoppingCart.cartItems, 'Verify count of products at the Shopping cart page').toHaveCount(2);
        });

        await test.step('Verify correct products in the cart', async () => {
            await expect(app.shoppingCart.cartInventoryItemTitle, 'Verify correct products in the cart - contain correct titles').toHaveText(products.map(({ title }) => title));
            await expect(app.shoppingCart.cartInventoryItemDesc, 'Verify correct products in the cart - contain correct descriptions').toHaveText(products.map(({ desc }) => desc));
            await expect(app.shoppingCart.cartInventoryItemPrice, 'Verify correct products in the cart - contain correct prices').toHaveText(products.map(({ price }) => price));
        });
    });
});
