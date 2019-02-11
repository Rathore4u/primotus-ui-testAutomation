const shortId = require('shortid');

export class RandomHelper {
    static getRandomString(size = 6) {
        let randomText = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            + 'abcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < size; i++) {
            randomText += possible.charAt(
                Math.floor(Math.random() * possible.length));
        }
        return randomText;
    }

    static getRandomNumber(size = 6) {
        let randomNumber = '';
        const possible = '0123456789';

        for (let i = 0; i < size; i++) {
            randomNumber += possible.charAt(
                Math.floor(Math.random() * possible.length));
        }
        return randomNumber;
    }

    static getRandomEmail(size = 6, domain = '@email.com') {
        const randomEmailId = this.getRandomString(size);
        const randomEmail = `${randomEmailId}${domain}`;
        return randomEmail;
    }

    static getUniqueIdForCategory(length: number) {
        return Math.random().toString(36).substr(2, length);
    }

    static getUniqueIdWithAlphabetsOnly() {
        return this.getUniqueId().replace(/[0-9]/g, '');
    }

    static getUniqueId(): string {
        // noinspection reason: Giving error for unknown character function
        // noinspection Annotator
        shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');
        return shortId.generate().replace(/-/g, '').replace(/_/g, '');
    }

    static getUniqueIntId(size: number) {
        let randomNumber = '';
        const possible = '0123456789';

        for (let i = 0; i < size; i++) {
            randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return randomNumber;
    }

    async randomString(size: number) {
        let text: string;
        text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < size; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
