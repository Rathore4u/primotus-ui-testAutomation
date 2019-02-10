import { browser, ElementArrayFinder } from 'protractor';
import { StepLogger } from '../../../../core/logger/step-logger';
import { PageHelper } from '../../../components/html/page-helper';
import * as path from 'path';
import { GridElements } from '../../../components/html/component-types/grid-elements';
import { WaitHelper } from '../../../components/html/wait-helper';

const fs = require('fs');

export class CommonPageHelper {

    static async genericLogout() {
        StepLogger.subStep('Cleanup browser to logout');
        await browser.manage().deleteAllCookies();
        await PageHelper.executeScript('window.onbeforeunload = function(e){};' +
            'try{window.sessionStorage.clear();window.localStorage.clear();}catch(e){};location.reload();');
    }

    static getFileUploadFilePath(fileName: string) {
        return path.join(path.resolve('.'), `${path.sep}upload${path.sep}`, fileName);
    }

    static readFile(fileName: string) {
        const filePath = this.getFileUploadFilePath(fileName);
        return String(fs.readFileSync(filePath).toString());
    }

    static async getColumnIndexByText(
        tableNameClassOrId: string, columnName: string
    ) {
        const columns = await PageHelper.getAllTexts(
            GridElements.getAllTableColumnHeaders(tableNameClassOrId));
        return columns.lastIndexOf(columnName); // Real columns index for xPaths
    }

    static async getColumnIndexByColumnName(
        tableColumns: ElementArrayFinder, columnName: string
    ) {
        const columns = await PageHelper.getAllTexts(tableColumns);
        return columns.lastIndexOf(columnName); // Real columns index for xPaths
    }

    static async waitForPageStabilize() {
        StepLogger.subStep('Wait for few seconds for page to stable');
        await WaitHelper.sleepForTwoSeconds();
        await WaitHelper.waitForPageToStable();
        await WaitHelper.sleepForTwoSeconds();
    }

    static getFile(filename: string) {
        return path.resolve(__dirname, '..', '..', '..', '..', 'resources', filename);
    }

    static async switchToDefaultContent() {
        StepLogger.subStep('Switch to default content');
        await browser.waitForAngularEnabled(false);
        await PageHelper.switchToDefaultContent();
        await browser.waitForAngularEnabled(false);
    }

    static async deleteAllCookiesAndRefresh() {
        StepLogger.subStep('Delete all cookies and refresh the page');
        try {
            await browser.manage().deleteAllCookies();
            await PageHelper.refreshPage();
        } catch (e) { }
    }
}
