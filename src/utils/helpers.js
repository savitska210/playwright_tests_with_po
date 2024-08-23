// get N random products from Products array
/**
 * @param {Array} allProducts
 * @param {number} count
 * @returns {Array}
 */
export function getRandomProducts(allProducts, count) {
    const allRandomProducts = allProducts.sort(() => Math.random() - 0.5);
    const randomProducts = allRandomProducts.slice(0, count);
    return randomProducts;
}

export function calculateSubTotal(products) {
    const subTotalSumVar = products.reduce((sum, product) => sum + product.totalProductSum, 0);
    return subTotalSumVar;
}

export function calculateTotalSum(subTotal, taxPercent) {
    const total = parseFloat((subTotal * taxPercent + subTotal).toFixed(2));
    return total;
}
