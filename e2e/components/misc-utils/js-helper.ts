export class JsHelper {
    static trimArray(arr: string[]) {
        for (let index = 0; index < arr.length; index++) {
            arr[index] =
                arr[index]
                    .replace(/^\s\s*/, '')
                    .replace(/\s\s*$/, '');
        }
        return arr;
    }

    /**
     * Returns dd MMM yyyy as 16 May 2016
     * @returns {string}
     */
    static getTodayDate(addDays = 0) {
        const today = new Date();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        today.setDate(today.getDate() + addDays);
        return `${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;
    }

    /**
     * This JavaScript function always returns a random number between min and max (both included):
     * @param min
     * @param max
     * @returns {any}
     */
    static getRandomInteger(min = 1, max = 999): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static cleanArray(arr: string[]) {
        const newArray = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]) {
                newArray.push(arr[i]);
            }
        }
        return newArray;
    }
}
