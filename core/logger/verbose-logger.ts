import { browser, ElementFinder } from 'protractor';

const isVerboseLoggingEnabled: boolean = browser.params.verboseLogging;

/**
 * Static logging helper class that outputs verbose information to the console.
 * Calls to this class only log to the console if the ENABLE_VERBOSE_LOGGING env variable is set to true.
 */
export class VerboseLogger {
    /**
     * Send the message to console.debug with a timestamp, only is ENABLE_VERBOSE_LOGGING is true.
     * @param {string} message
     */
    public static log(message: string): void {
        if (isVerboseLoggingEnabled) {
            const timestamp = new Date().toISOString().split('T')[1];
            // tslint:disable-next-line:no-console
            console.debug(`[${timestamp} - verbose]: ${message}.`);
        }
    }

    public static logSelector(timeout: number, targetElement: ElementFinder, awaitedState: string): void {
        const selector = targetElement.locator().toString();
        VerboseLogger.log(`Waiting ${timeout}ms for element with selector [${selector}] to ${awaitedState}.`);
    }
}
