import { browser } from 'protractor';

export class CommonPageConstant {

    static get credentials() {
        // Not a typed object
        // noinspection Annotator
        const users = browser.params.users;
        return {
            adminUser: {
                userName: users.adminUser.email.toString(),
                password: users.adminUser.password.toString(),
            }
        };
    }
}
