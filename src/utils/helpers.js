import { faker } from '@faker-js/faker';

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

export function generateFirstName() {
    const firstName = faker.person.firstName();
    return firstName;
}

export function generateLastName() {
    const lastName = faker.person.lastName();
    return lastName;
}

export function generatePostalCode() {
    const postalCode = faker.location.zipCode();
    return postalCode;
}

export function calculateTotalSum(subTotal, taxPercent) {
    const total = parseFloat((subTotal * taxPercent + subTotal).toFixed(2));
    return total;
}
