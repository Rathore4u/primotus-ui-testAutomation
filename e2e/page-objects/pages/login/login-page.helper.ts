import { browser } from 'protractor';

import { StepLogger } from '../../../../core/logger/step-logger';
import { ElementHelper } from '../../../components/html/element-helper';
import { TextBoxHelper } from '../../../components/html/textbox-helper';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { BasePageHelper } from '../base-page.helper';
import { LoginPageConstant } from './login-page.constant';
import { LoginPage } from './login.po';
import { CommonPageConstant } from '../common/common-page.constant';
import { CommonPageHelper } from '../common/common-page.helper';

export class LoginPageHelper extends BasePageHelper {
    static readonly admin = CommonPageConstant.credentials.adminUser;

    static async login(username: string, password: string) {
        await browser.waitForAngularEnabled(false);
        if (!await LoginPage.formControls.username.isPresent()) {
            await CommonPageHelper.genericLogout();
        }
        StepLogger.subStep('Fill out valid username, password and press "Login".');
        StepLogger.subStep('Enter Username');
        await TextBoxHelper.sendKeys(LoginPage.formControls.username, username);

        StepLogger.subStep('Enter Password');
        await TextBoxHelper.sendKeys(LoginPage.formControls.password, password);

        StepLogger.subStep('Click on SignIn Button');
        await ElementHelper.click(LoginPage.formControls.signIn);
        await CommonPageHelper.waitForPageStabilize();
    }

    // Logger inside the helper will improve readability and will reduce the code, Otherwise wherever the helper is used we will have
    // to add it everywhere
    static async verifyNavigation() {
        await ExpectationHelper
            .verifyDisplayedStatus(LoginPage.formControls.signIn, LoginPageConstant.pageName);
    }

    static async loginToApplication() {
        await this.login(this.admin.userName, this.admin.password);
    }

    url(): string {
        return '/';
    }
}
