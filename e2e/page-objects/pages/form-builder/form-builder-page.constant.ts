export class FormBuilderPageConstant {
    static readonly pageName = 'forms';
    static readonly formName = 'qa_p1_t1';

    static get filterByStatus() {
        return {
            root: 'filterByStatus',
            options: {
                all: 'All',
                drafts: 'Drafts',
                published: 'Published',
            }
        };
    }

    static get locators() {
        return {
            workFlowStatusDropdown: '//*[@data-od-tooltip="DS Type Work Order" and contains(text(),"Workflow Status")]//ancestor::div[@class="item-container"]',
        };
    }
}
