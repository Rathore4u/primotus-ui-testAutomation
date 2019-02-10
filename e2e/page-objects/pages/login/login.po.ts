import { element, By } from 'protractor';

export class LoginPage {

    static get formControls() {
        return {
            username: element(By.css('[type="email"]')),
            password: element(By.css('[type="password"]')),
            signIn: element(By.css('[type="submit"]')),
        };
    }
}
