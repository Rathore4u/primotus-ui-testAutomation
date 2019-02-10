import { PageHelper } from './page-helper';
import { browser, ElementFinder, protractor } from 'protractor';
import { VerboseLogger } from '../../../core/logger/verbose-logger';

export class WaitHelper {
    static readonly EC = protractor.ExpectedConditions;

    /**
     * Default timeout for promises
     * @type {number}
     */
    /**
     * Wait for an element to exist
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElement(targetElement: ElementFinder,
                                timeout = PageHelper.DEFAULT_TIMEOUT,
                                message = 'Element should exist') {
        VerboseLogger.logSelector(timeout, targetElement, 'exist');
        return browser.wait(this.EC.presenceOf(targetElement),
            timeout,
            targetElement.locator().toString() + message);
    }

    /**
     * Wait for an element to display
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElementToBeDisplayed(targetElement: ElementFinder,
                                             timeout = PageHelper.DEFAULT_TIMEOUT,
                                             message = 'Element should be visible') {
        VerboseLogger.logSelector(timeout, targetElement, 'be visible');
        return browser.wait(this.EC.visibilityOf(targetElement),
            timeout,
            targetElement.locator().toString() + message)
            .then(() => true, () => false);
    }

    /**
     * Wait for an element to have a certain value
     * @param {ElementFinder} targetElement
     * @param {string} text
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElementValueToContainText(
            targetElement: ElementFinder,
            text: string,
            timeout = PageHelper.DEFAULT_TIMEOUT,
            message = 'Element value should contain expected text') {
        VerboseLogger.logSelector(timeout, targetElement, 'value contain text');
        return browser.wait(this.EC.textToBePresentInElementValue(targetElement, text),
        timeout,
        targetElement.locator().toString() + message)
        .then(() => true, () => false);
    }

    /**
     * Wait for an element to present
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElementToBePresent(targetElement: ElementFinder,
                                           timeout = PageHelper.DEFAULT_TIMEOUT,
                                           message = 'Element should be visible') {
        VerboseLogger.logSelector(timeout, targetElement, 'be present');
        return browser.wait(this.EC.presenceOf(targetElement),
            timeout,
            targetElement.locator().toString() + message)
            .then(() => true, () => false);
    }

    /**
     * Wait for an element to hide
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     * @returns {any}
     */
    static async waitForElementToBeHidden(targetElement: ElementFinder,
                                          timeout = PageHelper.DEFAULT_TIMEOUT,
                                          message = 'Element should not be visible') {
        VerboseLogger.logSelector(timeout, targetElement, 'be invisible');
        return browser.wait(this.EC.invisibilityOf(targetElement),
            timeout,
            targetElement.locator().toString() + message);
    }

    /**
     * Wait for an element to become clickable
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElementToBeClickable(targetElement: ElementFinder,
                                             timeout = PageHelper.DEFAULT_TIMEOUT,
                                             message = 'Element not clickable') {
        VerboseLogger.logSelector(timeout, targetElement, 'be clickable');
        try {
            await browser.wait(this.EC.elementToBeClickable(targetElement),
                timeout,
                targetElement.locator().toString() + message);
        } catch (e) {
        }
    }

    static async waitForElementToHaveText(targetElement: ElementFinder, timeout = PageHelper.DEFAULT_TIMEOUT, message = '') {
        await this.waitForElementToBePresent(targetElement);
        VerboseLogger.logSelector(timeout, targetElement, 'have text');
        await browser.wait(async () => (await targetElement.getText()).trimLeft().trimRight() !== '',
            timeout, message);
    }

    static async waitForElementToContainText(targetElement: ElementFinder, expectedValue: string, timeout = PageHelper.timeout.l) {
        await this.waitForElementToBePresent(targetElement);
        VerboseLogger.logSelector(timeout, targetElement, `to contain ${expectedValue}`);
        const isFound = this.EC.textToBePresentInElement(targetElement, expectedValue);
        return browser.wait(isFound, timeout).then(function () {
            return true;
        }, function () {
            return false;
        });
    }

    static async waitForElementOptionallyPresent(targetElement: ElementFinder, timeout = PageHelper.DEFAULT_TIMEOUT) {
        const isDisplayed = this.EC.presenceOf(targetElement);
        return browser.wait(isDisplayed, timeout).then(function () {
            return true;
        }, function () {
            return false;
        });
    }

    /**
     * Wait for an element to be enabled
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     * @returns {any}
     */
    static async waitForElementToBeEnabled(targetElement: ElementFinder,
                                           timeout = PageHelper.DEFAULT_TIMEOUT,
                                           message = 'Element not enabled') {
        return await browser.wait(targetElement.isEnabled(), timeout,
            targetElement.locator().toString() + message);
    }

    /**
     * Wait for an element to be selected
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     * @returns {any}
     */
    static async waitForElementToBeSelected(targetElement: ElementFinder,
                                            timeout = PageHelper.DEFAULT_TIMEOUT,
                                            message = 'Element not selected') {
        return await browser.wait(targetElement.isSelected(), timeout,
            targetElement.locator().toString() + message);
    }

    /**
     * Wait for the element to be gone
     */

    static async sleep(sleepTime = PageHelper.timeout.xxs) {
        await browser.sleep(sleepTime);
    }

    static async sleepForTwoSeconds() {
        return await WaitHelper.sleep(PageHelper.timeout.xs);
    }

    /**
     * Wait till complete page loading
     */
    static async waitForPageToStable() {
        while (true) {
            const result = browser.executeScript('return document.readyState == \'complete\'');
            if (result) {
                return;
            }
        }
    }
}
