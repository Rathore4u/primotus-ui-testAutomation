/**
 * General contract which has to be implemented by all the page
 * objects to maintain consistency for basic functionality
 */

export interface PageContract {
    /**
     * Url for identification for derived page
     */
    url(): string;

    /**
     * this can be called to go to url
     */
    goTo(): void;

    /**
     * Returns whether we are on that url or not
     * @returns {promise.Promise<boolean>}
     */
    verifyExistence(): any;
}
