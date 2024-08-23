/* eslint-disable no-console */
/* eslint-disable function-paren-newline */
/* eslint-disable playwright/expect-expect */
/* eslint-disable no-restricted-syntax */
import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { users } from '../test_data/users';
import { calculateSubTotal, calculateTotalSum } from '../utils/helpers';

test.describe('Tests Unit 10', () => {
    const {
        username, password, firstName, lastName, postalCode,
    } = users.standardUser;
    test.beforeEach(async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        // Log in
        await app.login.navigate();
        await app.login.performLogin(username, password);

        // Verify success login perform
        await expect(app.inventory.headingTitle).toBeVisible();
        console.log(`Running ${test.info().title}...`);
    });

    test.afterEach(async (
        /** @type {{ app: import('../pages/Application').Application }} */{ }, testInfo) => {
        // Remove all items into the cart
        // await app.shoppingCart.navigate();
        // await app.shoppingCart.removeAllItems();

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

        // go to the Shopping cart page from header
        await app.inventory.header.navigateToCartFromHeader();

        // Verify count of products at the Shopping cart page
        await test.step('Verify count of products at the Shopping cart page', async () => {
            await expect(app.shoppingCart.cartItems, 'Verify count of products at the Shopping cart page').toHaveCount(2);
        });

        // Verify correct products in the cart
        await test.step('Verify correct products in the cart', async () => {
            await expect(app.shoppingCart.cartInventoryItemTitle, 'Verify correct products in the cart - contain correct titles').toHaveText(products.map(({ title }) => title));
            await expect(app.shoppingCart.cartInventoryItemDesc, 'Verify correct products in the cart - contain correct descriptions').toHaveText(products.map(({ desc }) => desc));
            await expect(app.shoppingCart.cartInventoryItemPrice, 'Verify correct products in the cart - contain correct prices').toHaveText(products.map(({ price }) => price));
        });
    });

    test('Verify the transition to the checkout from the cart', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app }) => {
        // Adding 2 random products to the cart
        const products = await test.step('Verify count of product in the cart  (on the cart badge at the header)', async () => {
            const addedProducts = app.inventory.addRandomProductsToCart();
            // Verify count of product in the cart  (on the cart badge at the header)
            await expect(app.inventory.header.shoppingCartBadge, 'Verify count of product in the cart  (on the cart badge at the header)').toHaveText('2');
            return addedProducts;
        });

        // go to the Shopping cart page
        await app.inventory.header.navigateToCartFromHeader();

        // go to the Checkout Form
        await app.shoppingCart.gotoCheckoutFromCart();

        // Verify URL of Checkout first step form
        await test.step('Verify URL of Checkout first step form', async () => {
            const expectedUrl = app.checkoutStep1.url;
            await expect(app.page).toHaveURL(expectedUrl);
        });

        await app.checkoutStep1.navigate();
        await app.checkoutStep1.submitCheckoutForm(firstName, lastName, postalCode);
        await app.checkoutStep2.navigate();

        // Verify URL Checkout second step form
        await test.step('Verify URL Checkout second step form', async () => {
            const expectedUrl = app.checkoutStep2.url;
            await expect(app.page).toHaveURL(expectedUrl);
        });

        // Verify count of products at the Checkout
        await test.step('Verify count of products at the Checkout', async () => {
            await expect(app.checkoutStep2.cartItems, 'Verify count of products at the Checkout').toHaveCount(2);
        });

        // Verify products at the Checkout
        await test.step('Verify correct products in the cart - contain correct titles, description, prices', async () => {
            await expect(app.checkoutStep2.cartInventoryItemTitle, 'Verify correct products in the cart - contain correct titles').toHaveText(products.map(({ title }) => title));
            await expect(app.checkoutStep2.cartInventoryItemDesc, 'Verify correct products in the cart - contain correct descriptions').toHaveText(products.map(({ desc }) => desc));
            await expect(app.checkoutStep2.cartInventoryItemPrice, 'Verify correct products in the cart - contain correct prices').toHaveText(products.map(({ price }) => price));
        });

        // Verify correct subTotal sum at the Checkout
        let subTotalSum;
        await test.step('Verify correct subTotal sum at the Checkout', async () => {
            const productsCheckout = await app.checkoutStep2.getAllCartProducts();
            subTotalSum = calculateSubTotal(productsCheckout);
            const currentSum = await app.checkoutStep2.subTotal.textContent();
            expect(`Item total: $${subTotalSum}`, 'Verify correct sub Total sum into the Checkout').toEqual(currentSum);
        });

        // Verify correct Total sum at the Checkout
        await test.step('Verify correct Total sum at the Checkout', async () => {
            const taxPercent = 0.08;
            const totalSum = calculateTotalSum(subTotalSum, taxPercent);
            const currentTotal = await app.checkoutStep2.total.textContent();
            expect(`Total: $${totalSum}`, 'Verify correct Total sum into the Checkout').toEqual(currentTotal);
        });
    });
});
