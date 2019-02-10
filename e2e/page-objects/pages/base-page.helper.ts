import { browser } from 'protractor';
import { PageContract } from '../contracts/page.contract';
import { PageHelper } from '../../components/html/page-helper';

export abstract class BasePageHelper implements PageContract {
    abstract url(): string;

    async goTo() {
        return this.get(this.url());
    }

    async get(url: string) {
        await browser.waitForAngularEnabled(false);
        return browser.get(url, PageHelper.DEFAULT_TIMEOUT);
    }

    async verifyExistence() {
        const currentUrl = await browser.getCurrentUrl();
        return currentUrl.indexOf(this.url()) > -1;
    }
}
