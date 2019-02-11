import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { FormBuilderPageConstant } from './form-builder-page.constant';
import {PageHelper} from '../../../components/html/page-helper';
import {FormBuilder} from './form-builder.po';
import {ElementHelper} from '../../../components/html/element-helper';
import {TextBoxHelper} from '../../../components/html/textbox-helper';
import {browser} from 'protractor';
import {WaitHelper} from '../../../components/html/wait-helper';
import {CommonPageHelper} from '../common/common-page.helper';

export class FormBuilderPageHelper {

    static async verifyNavigation() {
        await CommonPageHelper.waitForPageStabilize();
        const url = await PageHelper.getCurrentUrl();
        await ExpectationHelper
            .verifyStringValueContain(url, FormBuilderPageConstant.pageName);
    }

    static async changeFilterByStatusToAll() {
        await PageHelper.click(FormBuilder.filterByStatus.root);
        await CommonPageHelper.waitForPageStabilize();
        await PageHelper.scrollToElementAndClick(FormBuilder.filterByStatus.options.all);
    }

    static async selectOnHoldInWorkFlowStatus() {
        await browser.sleep(PageHelper.timeout.s);
        await PageHelper.scrollToElement(FormBuilder.workFlowStatusDropdown);
        await browser.sleep(PageHelper.timeout.xs);
        await PageHelper.click(FormBuilder.workFlowStatusDropdown);
        await browser.sleep(PageHelper.timeout.xs);
        await PageHelper.click(FormBuilder.onHoldDropDown);
    }

    static async performSave() {
        await browser.sleep(PageHelper.timeout.xs);
        await PageHelper.click(FormBuilder.saveButton);
        await WaitHelper.waitForElementToBePresent(FormBuilder.doneStatus);
        await browser.sleep(PageHelper.timeout.s);
    }

    static async clickToPopupOpenButton() {
        await browser.sleep(PageHelper.timeout.xs);
        await PageHelper.click(FormBuilder.openButton);
    }

    static async openSearchDialogue() {
        await PageHelper.click(FormBuilder.searchButton);
        await TextBoxHelper.sendKeys(FormBuilder.searchTextBox, FormBuilderPageConstant.formName);
    }

    static async selectFirstForm() {
        await browser.sleep(PageHelper.timeout.xs);
        await ElementHelper.scrollToElement(FormBuilder.form);
        await PageHelper.click(FormBuilder.form);
        await browser.sleep(PageHelper.timeout.xs);
    }

    static async selectFirstCreatedForm() {
        await browser.sleep(PageHelper.timeout.xs);
        await ElementHelper.scrollToElement(FormBuilder.firstForm);
        await PageHelper.click(FormBuilder.firstForm);
        await browser.sleep(PageHelper.timeout.xs);
    }

    static async clickOnCopyAndPrefix() {
        await PageHelper.click(FormBuilder.copyButton);
        console.log(FormBuilder.formDetails.newFormName);
        await TextBoxHelper.sendKeys(FormBuilder.textBoxField, FormBuilder.formDetails.newFormName);
        await PageHelper.click(FormBuilder.popupCopyButton);
        await browser.sleep(PageHelper.timeout.s);
    }

    static async searchForWorkOrder() {
        console.log(FormBuilder._uuid.toString());
        await TextBoxHelper.sendKeys(FormBuilder.searchTextBox, 'qa-' + FormBuilder._uuid.toString());
    }

    static async verifyAllStatusSelected() {
        await ExpectationHelper
            .verifyDisplayedStatus(FormBuilder.filterByStatus.activeFilter.all, FormBuilderPageConstant.filterByStatus.options.all);
    }
}
