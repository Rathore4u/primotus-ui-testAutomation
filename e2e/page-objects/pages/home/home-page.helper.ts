import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { HomePageConstant } from './home-page.constant';
import {HomePage} from './home.po';
import {PageHelper} from '../../../components/html/page-helper';

export class HomePageHelper {

    static async verifyNavigation() {
        await ExpectationHelper
            .verifyElementPresentStatus(HomePage.icon, HomePageConstant.pageName);
    }

    static async navigateToFormBuilder() {
        await PageHelper.click(HomePage.topNavigation.siteSetup);
        await PageHelper.click(HomePage.siteSetup.formBuilder);
    }
}
