import { element, By } from 'protractor';

export class HomePage {

    static get icon() {
        return element(By.css('.navbar-brand .logo'));
    }

    static get topNavigation() {
        return {
            siteSetup: element(By.id('navbarDropdown-0')),
            setupForms: element(By.id('navbarDropdown-1')),
            resourceList: element(By.id('navbarDropdown-2')),
            enterOrders: element(By.id('navbarDropdown-3')),
            ordersInProgress: element(By.id('navbarDropdown4')),
            vehiclesReceivedDamaged: element(By.id('navbarDropdown-5')),
            damagedOrders: element(By.id('navbarDropdown-6')),
            completedOrders: element(By.id('navbarDropdown-7')),
        };
    }

    static get siteSetup() {
        return {
            formBuilder: element(By.css('[href*="admin/forms"]')),
        };
    }
}
