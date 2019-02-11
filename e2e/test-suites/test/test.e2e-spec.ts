import { LoginPageHelper } from '../../page-objects/pages/login/login-page.helper';
import { SuiteNames } from '../helpers/suite-names';
import { PageHelper } from '../../components/html/page-helper';
import { StepLogger } from '../../../core/logger/step-logger';
import { HomePageHelper } from '../../page-objects/pages/home/home-page.helper';
import { FormBuilderPageHelper } from '../../page-objects/pages/form-builder/form-builder-page.helper';
describe(SuiteNames.healthSuite, () => {

    beforeAll(async () => {
        await PageHelper.maximizeWindow();
        await new LoginPageHelper().goTo();
        await LoginPageHelper.verifyNavigation();
    });

    it('', async () => {

        StepLogger.caseId = 1;
        StepLogger.stepId(1);
        StepLogger.step('Login to application');
        await LoginPageHelper.loginToApplication();
        StepLogger.verification('Verify home page navigation');
        await HomePageHelper.verifyNavigation();

        StepLogger.stepId(2);
        StepLogger.step('Navigate to Form Builder Page');
        await HomePageHelper.navigateToFormBuilder();
        StepLogger.verification('Verify Form Builder page navigation');
        await FormBuilderPageHelper.verifyNavigation();

        StepLogger.stepId(3);
        StepLogger.step('Change filter to all');
        await FormBuilderPageHelper.changeFilterByStatusToAll();
        StepLogger.verification('User should get navigated to Home page');
        await FormBuilderPageHelper.verifyAllStatusSelected();

        StepLogger.stepId(4);
        // step 4 & 5 inside the function
        StepLogger.step('Filter qa_p1 to find the form qa_p1_t1,');

        StepLogger.stepId(4);
        // step 4 & 5 inside the function
        StepLogger.step('Select form card then use copy button to copy that form and add uuid and prefix “qa-”');
        await FormBuilderPageHelper.selectFirstForm();

        StepLogger.stepId(5);
        StepLogger.step('Select form card then use copy button to copy that form and add uuid and prefix “qa-”');
        await FormBuilderPageHelper.clickOnCopyAndPrefix();

        StepLogger.stepId(6);
        StepLogger.step('Click open to move to previous view');
        await FormBuilderPageHelper.clickToPopupOpenButton();

        StepLogger.stepId(7);
        StepLogger.step('Navigate to this new card with uuid filter and item by selecting the card');
        await FormBuilderPageHelper.searchForWorkOrder();

        StepLogger.stepId(8);
        StepLogger.step('Select form card then use copy button to copy that form and add uuid and prefix “qa-”');
        await FormBuilderPageHelper.selectFirstForm();

        StepLogger.stepId(9);
        StepLogger.step('Select on Hold in Work Flow Status for opened card');
        await FormBuilderPageHelper.selectOnHoldInWorkFlowStatus();

        StepLogger.stepId(10);
        // step 4 & 5 inside the function
        StepLogger.step('Select form card then use copy button to copy that form and add uuid and prefix “qa-”');
        await FormBuilderPageHelper.performSave();
    });
});
