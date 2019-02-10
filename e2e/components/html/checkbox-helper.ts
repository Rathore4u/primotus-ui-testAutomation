import { ElementFinder } from 'protractor';
import { WaitHelper } from './wait-helper';

export class CheckboxHelper {
    /**
     * Returns
     * input[@type="checkbox" and contains(@name,@param)]
     * or
     * input[@type="checkbox" and normalize-space(@name)=attributeValue] based on the parameter
     * @example
     * // Returns input[@type="checkbox" and contains(@name,@param)]
     * this.getCheckboxXpathByName(text:attributeValue, isContains:true);
     * // Returns input[@type="checkbox" and normalize-space(@name)=attributeValue]
     * this.getCheckboxXpathByName(text:attributeValue, isContains:false);
     * @param {string} name
     * @param {boolean} isContains
     * @returns {string}
     */

    static async markCheckbox(elementt: ElementFinder, markChecked: boolean) {
        await WaitHelper.waitForElementToBeClickable(elementt);

        const isSelected = await elementt.isSelected();
        if (isSelected !== markChecked) {
            await elementt.click();
        }
        return;
    }

    static async isCheckboxChecked(locator: ElementFinder) {
        await WaitHelper.waitForElementToBeDisplayed(locator);
        return locator.isSelected();
    }
}
