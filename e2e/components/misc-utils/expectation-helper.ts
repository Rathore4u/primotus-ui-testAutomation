/* tslint:disable:max-file-line-count */
import { PageHelper } from '../html/page-helper';
import { browser, ElementFinder } from 'protractor';
import { ValidationsHelper } from './validation-helper';
import { HtmlHelper } from './html-helper';
import { CheckboxHelper } from '../html/checkbox-helper';
import { TextBoxHelper } from '../html/textbox-helper';
import { ElementHelper } from '../html/element-helper';
import { StepLogger } from '../../../core/logger/step-logger';

export class ExpectationHelper {
    /**
     * Verify whether an element is displayed or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param {StepLogger} stepLogger
     * @param refresh
     * @returns {Promise<void>}
     */
    static async verifyDisplayedStatus(targetElement: ElementFinder, elementName: string, refresh = true) {
        StepLogger.verification(`${elementName} should display`);
        const isDisplayed = await PageHelper.isElementDisplayed(targetElement);
        if (!isDisplayed && refresh) {
            await browser.refresh();
            await this.verifyDisplayedStatus(targetElement, elementName, false);
            return;
        }
        await expect(await PageHelper.isElementDisplayed(targetElement))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(elementName));
    }

    /**
     * Verify whether an element is displayed or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyNotDisplayedStatus(targetElement: ElementFinder, elementName: string, ) {
        StepLogger.verification(`${elementName} should not display`);
        await expect(await PageHelper.isElementPresent(targetElement, false))
            .toBe(false, ValidationsHelper.getDisplayedValidation(elementName));
    }

    /**
     * Verify whether an element is displayed or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyElementPresentStatus(targetElement: ElementFinder, elementName: string, ) {
        StepLogger.verification(`${elementName} should present`);
        await expect(await PageHelper.isElementPresent(targetElement))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(elementName));
    }

    /**
     * Verify whether an element is hidden or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param {StepLogger} StepLogger
     * @param toWait
     * @returns {Promise<void>}
     */
    static async verifyHiddenStatus(targetElement: ElementFinder, elementName: string, toWait = true) {
        StepLogger.verification(`${elementName} should be hidden`);
        await expect(await PageHelper.isElementHidden(targetElement, toWait))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(elementName));
    }

    /**
     * Verify whether an element is hidden or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyCheckboxIsChecked(targetElement: ElementFinder, elementName: string, ) {
        StepLogger.verification(`${elementName} should be checked`);
        const checkBoxStatus = await CheckboxHelper.isCheckboxChecked(targetElement);
        await expect(checkBoxStatus).toBe(true, ValidationsHelper.getDisplayedValidation(elementName));
    }

    /**
     * Verify whether an element is hidden or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyRemovedStatus(targetElement: ElementFinder, elementName: string, ) {
        StepLogger.verification(`${elementName} should be removed`);
        await expect(await PageHelper.isElementHidden(targetElement))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(elementName));
    }

    /**
     * Verify whether an element is enabled or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyEnabledStatus(targetElement: ElementFinder, elementName: string, ) {
        StepLogger.verification(`${elementName} should be enabled`);
        await expect(await PageHelper.isElementEnabled(targetElement))
            .toBe(true,
                ValidationsHelper.getEnabledValidation(elementName));
    }

    /**
     * Verify whether an element is present or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyPresentStatus(targetElement: ElementFinder, elementName: string, ) {
        StepLogger.verification(`${elementName} should present`);
        await expect(await PageHelper.isElementPresent(targetElement))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(elementName));
    }

    /**
     * Verify whether an element is enabled or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifySelectedStatus(targetElement: ElementFinder, elementName: string, ) {
        StepLogger.verification(`${elementName} should be selected`);
        await expect(await PageHelper.isElementSelected(targetElement))
            .toBe(true,
                ValidationsHelper.getSelectedValidation(elementName));
    }

    /**
     * Verify whether an element is disabled or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyDisabledStatus(targetElement: ElementFinder, elementName: string, ) {
        StepLogger.verification(`${elementName} should be disabled`);
        await expect(await PageHelper.isElementEnabled(targetElement))
            .toBe(false,
                ValidationsHelper.getDisabledValidation(elementName));
    }

    /**
     * Verify that TextBox has the exact text
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param {string} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyTextBoxContains(targetElement: ElementFinder, elementName: string, expectedValue: string, ) {
        StepLogger.verification(`${elementName} should contain ${expectedValue} value`);
        const val = await PageHelper.getAttributeValue(
            targetElement,
            HtmlHelper.attributes.value,
        );
        await expect(val.toLowerCase() === expectedValue.toLowerCase())
            .toBe(true, ValidationsHelper.getFieldValueValidation(val, expectedValue));
    }

    /**
     * Verify that element has the exact text
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param {string} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyText(targetElement: ElementFinder, elementName: string, expectedValue: string, ) {
        StepLogger.verification(`${elementName} should have exact text as ${expectedValue} `);
        await expect((await ElementHelper.getText(targetElement)).toLowerCase())
            .toBe(expectedValue.toLowerCase(),
                ValidationsHelper.getFieldShouldHaveValueValidation(elementName, expectedValue));
    }

    /**
     * Verify that textbox element has the exact value
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param {string} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyValue(targetElement: ElementFinder, elementName: string, expectedValue: string, ) {
        StepLogger.verification(`${elementName} should have exact value as ${expectedValue} `);
        await expect(await TextBoxHelper.hasValue(targetElement, expectedValue))
            .toBe(true,
                ValidationsHelper.getFieldShouldHaveValueValidation(elementName, expectedValue));
    }

    /**
     * Verify that element contains the text
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param {string} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyTextContains(targetElement: ElementFinder, elementName: string, expectedValue: string, ) {
        StepLogger.verification(`${elementName} should contain ${expectedValue} value`);
        await expect((await ElementHelper.getText(targetElement)).toLowerCase())
            .toContain(expectedValue.toLowerCase(),
                ValidationsHelper.getFieldShouldHaveValueValidation(elementName, expectedValue));
    }

    /**
     * Verify that value is grater than other value
     * @param {number} actualValue
     * @param {number} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyValueGreaterThan(actualValue: number, expectedValue: number, ) {
        StepLogger.verification(`${actualValue} should be grater than ${expectedValue} value`);
        await expect(actualValue).toBeGreaterThan(
            expectedValue, ValidationsHelper.getGraterThanValidation(actualValue, expectedValue));
    }

    /**
     * Verify that value is less or equal than other value
     * @param {number} actualValue
     * @param {number} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyValueLessOrEqualTo(actualValue: number, expectedValue: number, ) {
        StepLogger.verification(`${actualValue} should be less ot equal to ${expectedValue} value`);
        await expect(actualValue).toBeLessThanOrEqual(
            expectedValue, ValidationsHelper.getLessThanOrEqualToValidation(actualValue, expectedValue));
    }

    /**
     * Verify that value is less or equal than other value
     * @param {number} actualValue
     * @param {number} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyValueGreaterOrEqualTo(actualValue: number, expectedValue: number, ) {
        StepLogger.verification(`${actualValue} should be greater or equal to ${expectedValue} value`);
        await expect(actualValue).toBeGreaterThanOrEqual(
            expectedValue, ValidationsHelper.getGreaterThanOrEqualToValidation(actualValue, expectedValue));
    }

    /**
     * Verify that value is equal to other value
     * @param {number} actualValue
     * @param {number} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyValueEqualTo(actualValue: number, expectedValue: number, ) {
        StepLogger.verification(`${actualValue} should be equal to  ${expectedValue} value`);
        await expect(actualValue).toEqual(
            expectedValue, ValidationsHelper.getEqualToValidation(actualValue, expectedValue));
    }

    /**
     * Verify that value is not equal to other value
     * @param {string} actualValue
     * @param {string} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyValueNotEqualTo(actualValue: string, expectedValue: string, ) {
        StepLogger.verification(`${actualValue} should be not equal to ${expectedValue} value`);
        await expect(actualValue).not.toEqual(expectedValue,
            ValidationsHelper.getNotEqualToValidation(actualValue, expectedValue));
    }

    /**
     * Verify that checkbox is checked
     * @param targetElement
     * @param elementName
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyCheckBoxNotSelected(targetElement: ElementFinder, elementName: string, ) {
        const actualValue = await targetElement.isSelected();
        StepLogger.verification(`${elementName} should not be selected`);
        await expect(actualValue).toEqual(
            false, ValidationsHelper.getUnSelectedValidation(elementName));
    }

    /**
     * Verify that attribute values is equal to expected Value
     * @param targetElement
     * @param attribute
     * @param attribute
     * @param {string} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyAttributeValue(targetElement: ElementFinder, attribute: string, expectedValue: string, ) {
        const actualValue = await PageHelper.getAttributeValue(targetElement, attribute);
        StepLogger.verification(`${actualValue} should be equal to  ${expectedValue} value`);
        await expect(actualValue).toEqual(
            expectedValue, ValidationsHelper.getStringEqualToValidation(actualValue, expectedValue));
    }

    /**
     * Verify that attribute values is equal to expected Value
     * @param targetElement
     * @param attribute
     * @param attribute
     * @param {string} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyAttributeValueNotToBe(targetElement: ElementFinder,
                                             attribute: string,
                                             expectedValue: string,
    ) {
        const actualValue = await PageHelper.getAttributeValue(targetElement, attribute);
        StepLogger.verification(`${actualValue} should not be equal to  ${expectedValue} value`);
        await !expect(actualValue).not.toBe(
            expectedValue, ValidationsHelper.getStringEqualToValidation(actualValue, expectedValue));
    }

    /**
     * Verify that value is equal to other value
     * @param {string} actualValue
     * @param {string} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyStringValueEqualTo(actualValue: string, expectedValue: string, ) {
        StepLogger.verification(`${actualValue} should be equal to  ${expectedValue} value`);
        await expect(actualValue).toEqual(
            expectedValue, ValidationsHelper.getStringEqualToValidation(actualValue, expectedValue));
    }

    /**
     * Verify that value contains to other value
     * @param {string} actualValue
     * @param {string} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyStringValueContain(actualValue: string, expectedValue: string, ) {
        StepLogger.verification(`'${actualValue}' should contains  '${expectedValue}' value`);
        await expect(actualValue).toContain(
            expectedValue, ValidationsHelper.getStringEqualToValidation(actualValue, expectedValue));
    }

    /**
     * Verify that value not contains to other value
     * @param {string} actualValue
     * @param {string} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyStringValueNotContain(actualValue: string, expectedValue: string, ) {
        StepLogger.verification(`'${actualValue}' should not contains '${expectedValue}' value`);
        await expect(actualValue).not.toContain(
            expectedValue, ValidationsHelper.getStringEqualToValidation(actualValue, expectedValue));
    }

    /**
     * Verify that actual value contains expected value
     * @param {string} actualValue
     * @param {string} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyActualValueContainsExpectedValue(actualValue: string, expectedValue: string, ) {
        StepLogger.verification(`${actualValue} should contain ${expectedValue} value`);
        await expect(actualValue).toContain(expectedValue.toLowerCase(),
            ValidationsHelper.getFieldShouldHaveValueValidation(actualValue, expectedValue));
    }

    /**
     * Verify that element contains text
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param {string} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyContainsText(targetElement: ElementFinder, elementName: string, expectedValue: string, ) {
        StepLogger.verification(`${elementName} should have contains text as ${expectedValue} `);
        await expect((await PageHelper.getText(targetElement)).toLowerCase())
            .toContain(expectedValue.toLowerCase(),
                ValidationsHelper.getFieldShouldHaveValueValidation(elementName, expectedValue));
    }

    /**
     * Verify that value is not equal to other value
     * @param {string} actualValue
     * @param {string} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyStringValueNotEqualTo(actualValue: string, expectedValue: string, ) {
        StepLogger.verification(`${actualValue} should be equal to  ${expectedValue} value`);
        await expect(actualValue).not.toBe(
            expectedValue, ValidationsHelper.getNotEqualToValidation(actualValue, expectedValue));
    }

    /**
     * Verify that String is equal to other String
     * @param {number} actualValue
     * @param {number} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyStringEqualTo(actualValue: string, expectedValue: string, ) {
        StepLogger.verification(`${actualValue} should be equal to  ${expectedValue} value`);
        await expect(actualValue).toEqual(
            expectedValue, ValidationsHelper.getStringEqualToValidation(actualValue, expectedValue));
    }

    /**
     * Verify that String is not equal to other String
     * @param {number} actualValue
     * @param {number} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyStringNotEqualTo(actualValue: string, expectedValue: string, ) {
        StepLogger.verification(`${actualValue} should not be equal to  ${expectedValue} value`);
        await expect(actualValue).not.toBe(
            expectedValue, ValidationsHelper.getStringNotEqualToValidation(actualValue, expectedValue));
    }

    /**
     * Verify that CSS values is equal to expected Value
     * @param targetElement
     * @param attribute
     * @param {string} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyCssAttributeValue(targetElement: ElementFinder, attribute: string, expectedValue: string, ) {
        const actualValue = await PageHelper.getCssValue(targetElement, attribute);
        StepLogger.verification(`${actualValue} should be equal to  ${expectedValue} value`);
        await expect(actualValue).toEqual(
            expectedValue, ValidationsHelper.getStringEqualToValidation(actualValue, expectedValue));
    }

    /**
     * Verify that attribute values contains expected Value
     * @param targetElement
     * @param attribute
     * @param {string} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyAttributeContains(targetElement: ElementFinder, attribute: string, expectedValue: string, ) {
        const actualValue = await PageHelper.getAttributeValue(targetElement, attribute);
        StepLogger.verification(`${actualValue} should contain  ${expectedValue} value`);
        await expect(actualValue).toContain(
            expectedValue, ValidationsHelper.getStringToContain(actualValue, expectedValue));
    }

    /**
     * Verify that attribute values does not contain Value
     * @param targetElement
     * @param attribute
     * @param {string} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyAttributeNotContains(targetElement: ElementFinder, attribute: string, expectedValue: string,
    ) {
        const actualValue = await PageHelper.getAttributeValue(targetElement, attribute);
        StepLogger.verification(`${actualValue} should be equal to  ${expectedValue} value`);
        await expect(actualValue).not.toContain(
            expectedValue, ValidationsHelper.getStringToNotContain(actualValue, expectedValue));
    }

    static async verifyTextBoxHasValue(elementLocator: ElementFinder, locatorValue: string, ) {
        StepLogger.verification(`The ${locatorValue} values should display.`);
        await expect(await TextBoxHelper.hasValue(elementLocator, locatorValue))
            .toBe(true, ValidationsHelper.getFieldDisplayedValidation(locatorValue));
    }

    static async verifyAttributeNotToBeEmpty(targetElement: ElementFinder, attribute: string,
    ) {
        const actualValue = await PageHelper.getAttributeValue(targetElement, attribute);
        StepLogger.verification(`${actualValue} should not be null`);
        await expect(actualValue).not.toBeNull(
            ValidationsHelper.getStringToNotContain(actualValue, ''));
    }

    static async verifyTitle(
        expectedTitle: string,
    ) {
        StepLogger.subVerification(`Verify ${expectedTitle} page is displayed`);
        await expect(await PageHelper.getTitle()).toContain(expectedTitle,
            ValidationsHelper.getPageDisplayedValidation(expectedTitle));
    }

    static async verifyTypeOf(variable: any, expectedType: string, ) {
        StepLogger.subVerification(`${variable} should be type of ${expectedType}`);
        await expect(typeof (variable)).toBe(expectedType, `${variable} is not type of ${expectedType} but ${typeof (variable)}`);
    }

    /**
     * Verify that boolean value is equal to other boolean
     * @param {boolean} actualValue
     * @param {boolean} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyBooleanEqualTo(actualValue: boolean, expectedValue: boolean, ) {
        StepLogger.verification(`${actualValue} should be  equal to ${expectedValue}`);
        await expect(actualValue).toEqual(
            expectedValue, ValidationsHelper.getBooleanEqualToValidation(actualValue, expectedValue));
    }

    /**
     * Verify that CSS values contains expected Value
     * @param targetElement
     * @param attribute
     * @param {string} expectedValue
     * @param {StepLogger} StepLogger
     * @returns {Promise<void>}
     */
    static async verifyCssAttributeValueContain(targetElement: ElementFinder, attribute: string, expectedValue: string, ) {
        const actualValue = await PageHelper.getCssValue(targetElement, attribute);
        StepLogger.subVerification(`Verifying css value ${actualValue} should contain  ${expectedValue} value`);
        await expect(actualValue).toContain(
            expectedValue, ValidationsHelper.getStringToContain(actualValue, expectedValue));
    }
}
