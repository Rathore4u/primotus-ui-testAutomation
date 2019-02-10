import { browser, protractor } from 'protractor';
import { PageHelper } from './page-helper';
import { WaitHelper } from './wait-helper';
import { logger } from 'codelyzer/util/logger';

/**
 * Alert helper for general utility
 */
export class AlertHelper {
    private static readonly EC = protractor.ExpectedConditions;

    /**
     * Wait for an alert to appear
     * @param {number} timeout in milliseconds
     * @param {string} message
     */
    public static async waitForAlertToBePresent(timeout: number = PageHelper.DEFAULT_TIMEOUT,
                                                message: string = 'Alert is not present') {
        return await browser.wait(this.EC.alertIsPresent(), timeout, message);
    }

    /**
     * Accept javascript's alert
     */
    public static async acceptAlert() {
        return await browser.driver.switchTo().alert().accept();
    }

    /**
     * Cancel javascript's alert
     * @param {number} timeout in milliseconds
     * @param {string} message
     */
    public static async cancelAlert(timeout: number = PageHelper.DEFAULT_TIMEOUT,
                                    message: string = 'Alert is not present') {
        await this.waitForAlertToBePresent(timeout, message);
        return await browser.switchTo().alert().dismiss();
    }

    /**
     * Cancel javascript's alert if exists
     */
    public static async acceptAlertIfExists() {
        try {
            await browser.driver.switchTo().alert().then(function (alert: any) {
                alert.accept();
            }, function (error: any) {
                logger.error(error);
            });
        } catch (e) {
        }
    }

    /**
     * Dismiss javascript's alert if exists
     */
    public static async dismissAlertIfExists() {
        await WaitHelper.sleep(PageHelper.timeout.xs);
        try {
            await browser.driver.switchTo().alert().then(function (alert: any) {
                alert.dismiss();
            }, function (error: any) {
                logger.error(error);
            });
        } catch (e) {
        }
    }

    /**
     * Get javascript's alert text
     * @param {number} timeout in milliseconds
     * @param {string} message
     */
    public static async getAlertText(timeout: number = PageHelper.DEFAULT_TIMEOUT,
                                     message: string = 'Alert text could not be retrieved') {
        await this.waitForAlertToBePresent(timeout, message);
        return await browser.driver.switchTo().alert().getText();
    }

    public static async getText() {
        return browser.driver.switchTo().alert().then(function (alert: any) {
            const alertText = alert.getText();
            alert.accept();
            return alertText;
        }, function (error: any) {
            logger.error(error);
            return 'NO Alert found';
        });
    }

    public static async checkAlertPresent() {
        return browser.driver.switchTo().alert().then(function (alert: any) {
            alert.dismiss();
            return true;
        }, function (error: any) {
            logger.error(error);
            return false;
        });
    }

    public static async isAlertPresent() {
        await browser.sleep(PageHelper.timeout.s);
        return browser.driver.switchTo().alert().then(function () {
            return true;
        }, function (error: any) {
            logger.error(error);
            return false;
        });
    }
}
