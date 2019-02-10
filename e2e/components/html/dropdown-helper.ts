import { By, ElementFinder } from 'protractor';

export class DropDownHelper {
    static selectOptionByVal(locator: ElementFinder, optionVal: string) {
        return locator.element(By.css(this.getCssForOptionValue(optionVal))).click();
    }

    static getXPathForOptionValue(optionVal: string) {
        return `//option[normalize-space(.)="${optionVal}"]`;
    }

    static getCssForOptionValue(optionVal: string) {
        return `option[value="${optionVal}"]`;
    }

    static selectOptionByText(locator: ElementFinder, optionVal: string) {
        return locator.element(By.xpath(this.getXPathForOptionValue(optionVal))).click();
    }
}
