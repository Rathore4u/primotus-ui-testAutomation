/* tslint:disable:max-file-line-count */
/**
 * Page helper for general utility
 */
import {browser, ElementArrayFinder, ElementFinder, Key, WebElement} from 'protractor';
import {WaitHelper} from './wait-helper';
import {JsHelper} from '../misc-utils/js-helper';
import {StepLogger} from '../../../core/logger/step-logger';
import {ElementHelper} from './element-helper';
import {AlertHelper} from './alert-helper';

const shortId = require('shortid');

export class PageHelper {
    static MAX_RETRY_ATTEMPTS = 3;
    // noinspection JSValidateJSDoc
    /**
     * Timeout collection to meet various needs
     * @type {{xs: number; s: number; m: number; l: number; xl: number; xxl: number; xxxl: number}}
     */
    static timeout = {
        xxs: 1000,
        xs: 2000,
        s: 5000,
        m: 10000,
        l: 25000,
        xl: 50000,
        xxl: 75000,
        xxxl: 200000,
        xxxxl: 500000,
        xxxxxl: 900000,
    };
    static DEFAULT_TIMEOUT = PageHelper.timeout.xxl;

    static get isFullScreen() {
        const fullScreenScript = 'if (!window.screenTop && !window.screenY){return true;}'
            + 'else{return false;}';
        return browser.executeScript(fullScreenScript);
    }

    static actionKeyDown(key: string) {
        return browser.actions().keyDown(key).perform();
    }

    static async executeInIframe(index: number | WebElement, fn: Function) {
        await browser.switchTo().frame(index);
        fn();
        await browser.switchTo().defaultContent();
        await browser.waitForAngular();
    }

    static actionSendKeys(key: string) {
        return browser.actions().sendKeys(key).perform();
    }

    static actionKeyUp(key: string) {
        return browser.actions().keyUp(key).perform();
    }

    static keyPressForBrowser(key: string) {
        return browser.actions().sendKeys(key).perform();
    }

    static actionMouseUp(location: WebElement) {
        return browser.actions().mouseUp(location).perform();
    }

    // Known issue for chrome, direct maximize window doesn't work
    /**
     * To maximize the browser window
     */
    static async maximizeWindow() {
        return this.resizeWindow();
    }

    static async resizeHorizontally(height: number) {
        return this.resizeWindow(-1, height);
    }

    static async resizeVertically(width: number) {
        return this.resizeWindow(width);
    }

    /**
     * To resize the browser window
     */
    static async resizeWindow(width = -1, height = -1) {
        class Size {
            width: number;
            height: number;
        }

        const windowSize = await this.executeScript(function () {
            return {
                width: window.screen.availWidth,
                height: window.screen.availHeight,
            };
        });

        const result = windowSize as Size;
        if (width !== -1) {
            result.width = width;
        }

        if (height !== -1) {
            result.height = height;
        }

        return this.setWindowSize(result.width, result.height);
    }

    /**
     * Sets window size
     * @param {number} width
     * @param {number} height
     */
    static async setWindowSize(width: number, height: number) {
        return browser.driver
            .manage()
            .window()
            .setSize(width, height);
    }

    /**
     * Wrapper for executing javascript code
     * @param {string | Function} script
     * @param varAargs
     * @returns {promise.Promise<any>}
     */
    static async executeScript(script: string | Function, ...varAargs: any[]) {
        return browser.driver.executeScript(script, varAargs);
    }

    /**
     * Wrapper to return an active element
     * @returns {WebElementPromise}

     static async getFocusedElement() {
    return browser.driver.switchTo().activeElement()
  } */

    /**
     * Switch to a new tab if browser has availability
     * @returns {PromiseLike<boolean> | Promise<boolean> | Q.Promise<any> | promise.Promise<any> | Q.IPromise<any>}
     */
    static async switchToNewTabIfAvailable(windowNumber = 1) {
        const handles = await browser.getAllWindowHandles();
        const newWindowHandle = handles[windowNumber]; // this is your new window
        if (newWindowHandle) {
            await browser.switchTo().window(newWindowHandle);
        }
        const url = await browser.getCurrentUrl();

        // Avoiding bootstraping issue, Known issue
        // Error: Error while waiting for Protractor to sync with the page:
        // "window.angular is undefined. This could be either because this is a non-angular page or
        // because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.
        // See http://git.io/v4gXM for details
        return browser.driver.get(url);
    }

    public static async switchToFirstTab() {
        const handles = await browser.getAllWindowHandles();
        for (let i = 1; i < handles.length; i++) {
            await browser.switchTo().window(handles[i]);
            await browser.driver.close();
        }
        await browser.switchTo().window(handles[0]);
    }

    /**
     * Gets html attribute value
     * @param {WebElementPromise} elem
     * @param {string} attribute
     * @returns {string} attribute value
     */
    static async getAttributeValue(elem: ElementFinder, attribute: string) {
        await WaitHelper.waitForElementToBeDisplayed(elem);
        const attributeValue = await elem.getAttribute(attribute);
        return attributeValue.trim();
    }

    /**
     * Click on element
     * @param {ElementFinder} targetElement
     * @returns {any}
     */
    static async click(targetElement: ElementFinder) {
        await WaitHelper.waitForElementToBeClickable(targetElement);
        return targetElement.click();
    }

    static async fixHeader() {
        StepLogger.step('Fix the header');
        await this.executeScript(`try{
        if(location.href.indexOf('kitty')){
        document.getElementById('stickyHeader').className
        = document.getElementById('stickyHeader').className.replace(/affix(?!\\\\S)/,'')+' affix-top';
        console.log('executed menu correction')}}catch{}`);
    }

    static async clickIfPresent(targetElement: ElementFinder) {
        const isPresent = await targetElement.isPresent();
        if (isPresent) {
            return this.click(targetElement);
        }
        return;
    }

    /**
     * Click on the element and wait for it to get hidden
     * @param {ElementFinder} targetElement
     * @returns {PromiseLike<boolean> | Promise<boolean> | Q.Promise<any> | promise.Promise<any> | Q.IPromise<any>}
     */
    static async clickAndWaitForElementToHide(targetElement: ElementFinder) {
        await WaitHelper.waitForElementToBeClickable(targetElement);
        await targetElement.click();
        return WaitHelper.waitForElementToBeHidden(targetElement);
    }

    /**
     * Click on element if displayed
     * @param {ElementFinder} targetElement
     * @param withoutJs
     * @returns {any}
     */
    public static async clickIfDisplayed(targetElement: ElementFinder, withoutJs = true) {
        const isPresent = await targetElement.isPresent();
        if (isPresent === true) {
            const isDisplayed = await targetElement.isDisplayed();
            if (isDisplayed === true) {
                if (withoutJs) {
                    await PageHelper.click(targetElement);
                } else {
                    await ElementHelper.clickUsingJs(targetElement);
                }
            }
        }
    }

    static async getTextWithNoWait(elem: ElementFinder) {
        const text = await elem.getText();
        return text;
    }

    /**
     * Verify whether element is hidden on page or not
     * @param {ElementFinder} targetElement
     * @param {boolean} toWait
     * @returns {Promise<any>}
     */
    static async isElementHidden(targetElement: ElementFinder, toWait = true) {
        if (toWait) {
            return browser.wait(async () =>
                !(await targetElement.isPresent()) || !(await targetElement.isDisplayed()),
            ).then(() => true).catch(() => false);
        }
        return !(await targetElement.isPresent()) || !(await targetElement.isDisplayed());
    }

    public static async sleepForXSec(milliseconds: number) {
        await browser.sleep(milliseconds);
    }

    public static numberFromString(text: string) {
        return Number(text.replace(/\D+/g, ''));
    }

    /**
     * Gets innertext for all the elements
     * @param {WebElementPromise} elements
     * @returns {string} inner text
     */
    public static async getAllTextsInLowerCase(elements: ElementArrayFinder): Promise<string[]> {
        const allTexts = [];
        const allItems = await elements.asElementFinders_();
        for (const elem of allItems) {
            const elementText = await this.getText(elem);
            allTexts.push(elementText.toLowerCase());
        }
        return allTexts;
    }

    static async replaceSpaceWithMinus(text: string) {
        return text.replace(/\s+/g, '-');
    }

    public static async getMaximizeWindow() {
        await browser.driver.manage().window().maximize();
    }

    static async getText(elem: ElementFinder, toWait = true) {
        if (toWait) {
            await WaitHelper.waitForElementToBeDisplayed(elem);
        }
        const text = await elem.getText();
        return text.trim();
    }

    /**
     * Refresh a page
     *
     */
    public static async refreshPage(dismissAlert = true) {
        try {
            await browser.navigate().refresh();
            if (dismissAlert) {
                await AlertHelper.dismissAlertIfExists();
            }
        } catch (e) {
        }
    }

    /**
     * Refresh a page
     *
     */
    public static async refreshPageWithAcceptAlert(acceptAlert = true) {
        try {
            await browser.navigate().refresh();
            if (acceptAlert) {
                await AlertHelper.acceptAlertIfExists();
            }
        } catch (e) {
        }
    }

    /**
     * Complete Refresh a page
     *
     */
    public static async actionRefreshPage() {
        await browser.actions().keyDown(Key.CONTROL)
            .sendKeys(Key.F5).keyUp(Key.CONTROL).perform();
    }

    /**
     * Control + Click on element
     * @param targetElement
     */
    public static async actionControlClick(targetElement: ElementFinder) {
        await WaitHelper.waitForElementToBeDisplayed(targetElement);
        await ElementHelper.actionMouseMove(targetElement);
        await browser.actions().keyDown(Key.CONTROL)
            .click(targetElement).perform();
        await this.actionKeyUp(Key.CONTROL);
        await this.actionMouseUp(targetElement);
    }

    /**
     * DblClick on element
     * @param {ElementFinder} targetElement
     * @returns {any}
     */
    static async doubleClick(targetElement: ElementFinder) {
        await WaitHelper.waitForElementToBeClickable(targetElement);
        await browser.actions().doubleClick(targetElement).perform();
    }

    public static async clickAllElements(targetElements: ElementArrayFinder) {
        await targetElements.each(async function (elem) {
            await elem.click();
        });
    }

    /**
     * Gets innertext for all the elements
     * @param {WebElementPromise} elements
     * @param toWait
     * @returns {string} inner text
     */
    public static async getAllTexts(elements: ElementArrayFinder, toWait = true): Promise<string[]> {
        const allTexts = [];
        const allItems = await elements.asElementFinders_();
        for (const elem of allItems) {
            const elementText = await PageHelper.getText(elem, toWait);
            allTexts.push(elementText);
        }
        return allTexts;
    }

    public static async getAllTextsInArray(elements: ElementArrayFinder, toWait = true) {
        const allTexts: any = await PageHelper.getAllTexts(elements, toWait);
        return JsHelper.cleanArray(allTexts);
    }

    static async switchToiFrame(frameOrIframeElement: ElementFinder, sleepTime = PageHelper.timeout.xs) {
        await WaitHelper.waitForElementToBeDisplayed(frameOrIframeElement);
        // Wait is needed to load the iframe properly
        await browser.sleep(sleepTime);
        return await browser.switchTo().frame(frameOrIframeElement.getWebElement());
    }

    static async switchToDefaultContent() {
        await browser.switchTo().defaultContent();
    }

    static async switchToDefaultContentAndIFrame(frameOrIframeElement: ElementFinder, sleepTime = PageHelper.timeout.xs) {
        await browser.switchTo().defaultContent();
        await this.switchToiFrame(frameOrIframeElement, sleepTime);
    }

    public static async getPageTitle() {
        return await browser.getTitle();
    }

    public static async getPageSource() {
        return await browser.getPageSource();
    }

    public static async goToUrl(url: string, waitForAngular = false) {
        await browser.waitForAngularEnabled(waitForAngular);
        return await browser.get(url, PageHelper.DEFAULT_TIMEOUT);
    }

    /**
     * Verify whether element is displayed on page or not
     * @param {ElementFinder} targetElement
     * @param toWait
     * @param {boolean} toWait
     * @returns {Promise<any>}
     */
    static async isElementDisplayed(targetElement: ElementFinder, toWait = true) {
        const isPresent = await this.isElementPresent(targetElement, toWait);
        if (isPresent) {
            if (toWait) {
                await WaitHelper.waitForElementToBeDisplayed(targetElement);
            }
            return await targetElement.isDisplayed();
        } else {
            return isPresent;
        }
    }

    public static async isElementSelected(targetElement: ElementFinder, toWait = true) {
        if (toWait) {
            await WaitHelper.waitForElementToBeDisplayed(targetElement);
        }
        return await targetElement.isSelected();
    }

    public static async isElementEnabled(targetElement: ElementFinder, toWait = true) {
        if (toWait) {
            await WaitHelper.waitForElementToBeDisplayed(targetElement);
        }
        return await targetElement.isEnabled();
    }

    static async isElementPresent(targetElement: ElementFinder, toWait = true) {
        if (toWait) {
            await WaitHelper.waitForElementToBePresent(targetElement);
        }
        return await targetElement.isPresent();
    }

    static isListSorted(sourceList: any[], isAscending: boolean) {
        let isSorted = true;
        const sortList = Object.assign([], sourceList);
        sortList.sort((a, b) => (((a < b) === isAscending) ? -1 : 1));
        for (let i = 0; i < sourceList.length; i++) {
            if (sourceList[i] !== sortList[i]) {
                isSorted = false;
                break;
            }
        }
        return isSorted;
    }

    static async getTitle() {
        return await browser.driver.getTitle();
    }

    static async scrollToElement(elementt: ElementFinder) {
        return await browser.executeScript('arguments[0].scrollIntoView();', elementt);
    }

    static async scrollToElementAndClick(elementt: ElementFinder) {
        await this.scrollToElement(elementt);
        return await this.click(elementt);
    }

    static async hasVerticalScrollBar(element: ElementFinder) {
        return element.get(0) ? element.get(0).scrollHeight > element.innerheight() : false;
    }

    static async hasHorizontalScrollBar(element: ElementFinder) {
        return element.get(0) ? element.get(0).scrollWidth > element.innerWidth() : false;
    }

    /**
     * Gets CSS attribute value
     * @param {WebElementPromise} elem
     * @param {string} attribute
     * @returns {string} attribute value
     */
    static async getCssValue(elem: ElementFinder, attribute: string) {
        await WaitHelper.waitForElementToBeDisplayed(elem);
        const attributeValue = await elem.getCssValue(attribute);
        return attributeValue.trim();
    }

    static async getElementSize(elem: ElementFinder) {
        await WaitHelper.waitForElementToBeDisplayed(elem);
        const elemSize = await elem.getSize();
        return {
            width: elemSize.width,
            height: elemSize.height
        };
    }

    public static async getWindowCount() {
        const handles = await browser.getAllWindowHandles();
        const count = handles.length;
        return count;
    }

    public static async switchToTab(tabNumber: number) {
        const handles = await browser.getAllWindowHandles();
        await browser.switchTo().window(handles[tabNumber]);
        await WaitHelper.waitForPageToStable();
    }

    /**
     * Press CTRL + A
     */
    public static async actionClickControlAButton() {
        await browser.actions().keyDown(Key.CONTROL)
            .sendKeys('A').keyUp(Key.CONTROL).perform();
    }

    public static async closeTab() {
        await browser.driver.close();
    }

    public static async verifyIfListContentsAreEqual(sourceList: any[], destinationList: any[]) {
        let isEquals = true;
        for (let i = 0; i < sourceList.length; i++) {
            if (!sourceList[i] === (destinationList[i])) {
                isEquals = false;
                break;
            }
        }
        return isEquals;
    }

    public static async getTagName(targetElement: ElementFinder) {
        return await targetElement.getTagName();
    }

    /**
     * Get current url of the webpage
     */
    static async getCurrentUrl() {
        return await browser.getCurrentUrl();
    }

    static getUniqueId(): string {
        shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');
        return shortId.generate().replace(/-/g, '').replace(/_/g, '');
    }

    static getUniqueStringId(size = 8): string {
        shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');
        const newId: string = shortId.generate();
        return newId.substring(0, size);
    }

    static async navigateBack() {
        StepLogger.subStep('Navigate back in browser');
        await browser.navigate().back();
    }

    static async restartBrowser() {
        StepLogger.subStep('Restart Browser');
        await browser.restart();
        await this.maximizeWindow();
    }
}
