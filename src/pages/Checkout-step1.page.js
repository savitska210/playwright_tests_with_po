// @ts-check
import { BasePage } from './Base.page';
import { generateFirstName, generateLastName, generatePostalCode } from '../utils/helpers';

export class CheckoutStep1Page extends BasePage {
    url = '/checkout-step-one.html';

    inputFirstName = this.page.getByTestId('firstName');

    inputLastName = this.page.getByTestId('lastName');

    inputZipCode = this.page.getByTestId('postalCode');

    submitButton = this.page.getByTestId('continue');

    async submitValidDataForm() {
        const firstName = generateFirstName();
        const lastName = generateLastName();
        const postalCode = generatePostalCode();
        await this.inputFirstName.fill(firstName);
        await this.inputLastName.fill(lastName);
        await this.inputZipCode.fill(postalCode);
        await this.submitButton.click();
    }
}
