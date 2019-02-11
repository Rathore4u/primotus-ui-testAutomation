import { element, By } from 'protractor';
import {FormBuilderPageConstant} from './form-builder-page.constant';
import {PageHelper} from '../../../components/html/page-helper';

export class FormBuilder {

    public static _uuid = PageHelper.getUniqueStringId(8);

    static get form() {
        return element(By.xpath(`.//div[text()="${FormBuilderPageConstant.formName}"]`));
    }

    static get workFlowStatusDropdown() {
        return element(By.xpath(`${FormBuilderPageConstant.locators.workFlowStatusDropdown}`));
    }

    static get copyButton() {
        return element(By.css('i.fa-copy'));
    }

    static get onHoldDropDown() {
        return element(By.css('.//*[text()="On Hold"]'));
    }

    static get saveButton() {
        return element(By.css('i.fa-save'));
    }

    static get doneStatus() {
        return element(By.css('prm-loading-message'));
    }

    static get openButton() {
        return element(By.css('i.fa-folder-open-o'));
    }

    static get formDetails() {
        console.log(this._uuid.toString());
        return {
            newFormName: `qa-${this._uuid.toString()}-${FormBuilderPageConstant.formName}`
        };
    }

    static get textBoxField() {
        return element(By.id('name'));
    }

    static get searchTextBox() {
        return element(By.css('div input[type="text"]'));
    }

    static get popupCopyButton() {
        return element(By.css('.modal-footer .btn-primary'));
    }

    static get filterByStatus() {
        return {
            root: element(By.id('filterStatusHeader')),
            options: {
                all: element(By.xpath('//div[@id="filterStatusBody"]/div/div/label')),
                drafts: element(By.css('#filterStatusBody [value="drafts"]')),
                published: element(By.css('#filterStatusBody [value="published"]')),
            },
            activeFilter: {
                all: element(By.css('#filterStatusBody .active [value="all"]')),
                drafts: element(By.css('#filterStatusBody .active [value="drafts"]')),
                published: element(By.css('#filterStatusBody .active [value="published"]')),
            }
        };
    }
}
