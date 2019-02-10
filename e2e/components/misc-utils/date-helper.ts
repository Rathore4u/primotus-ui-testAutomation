export class DateHelper {

    static async getFutureDate(days: number, splitter = '/') {
        const currentDate = new Date();
        await currentDate.setDate(currentDate.getDate() + days);
        let dateAltered: any = currentDate.getDate();
        let month: any = currentDate.getMonth() + 1; // January is 0!
        if (dateAltered < 10) {
            dateAltered = '0' + dateAltered;
        }
        if (month < 10) {
            month = '0' + month;
        }
        const year = currentDate.getFullYear();
        const futureDate = `${dateAltered}${splitter}${month}${splitter}${year}`;
        return futureDate;
    }

    static async getFutureDateInSequenceMMDDYY(days: number, splitter = '/') {
        const currentDate = new Date();
        await currentDate.setDate(currentDate.getDate() + days);
        let dateAltered: any = currentDate.getDate();
        let month: any = currentDate.getMonth() + 1; // January is 0!
        if (dateAltered < 10) {
            dateAltered = '0' + dateAltered;
        }
        if (month < 10) {
            month = '0' + month;
        }
        const year = currentDate.getFullYear();
        const futureDate = `${month}${splitter}${dateAltered}${splitter}${year}`;
        return futureDate;
    }

    static async getPastDate(days: number, splitter = '/') {
        const currentDate = new Date();
        await currentDate.setDate(currentDate.getDate() - days);
        let dateAltered: any = currentDate.getDate();
        let month: any = currentDate.getMonth() + 1; // January is 0!
        if (dateAltered < 10) {
            dateAltered = '0' + dateAltered;
        }
        if (month < 10) {
            month = '0' + month;
        }
        const year = currentDate.getFullYear();
        const pastDate = `${dateAltered}${splitter}${month}${splitter}${year}`;
        return pastDate;
    }

    static async getPastDateAsMMddYYYY(days: number, splitter = '/') {
        const currentDate = new Date();
        await currentDate.setDate(currentDate.getDate() - days);
        let dateAltered: any = currentDate.getDate();
        let month: any = currentDate.getMonth() + 1; // January is 0!
        if (dateAltered < 10) {
            dateAltered = '0' + dateAltered;
        }
        if (month < 10) {
            month = '0' + month;
        }
        const year = currentDate.getFullYear();
        const pastDate = `${month}${splitter}${dateAltered}${splitter}${year}`;
        return pastDate;
    }

    static async getTodayDate(splitter = '/') {
        const todayDate = new Date();
        const year = todayDate.getFullYear().toString();
        const month = (todayDate.getMonth() + 1).toString(); // January is 0!
        const day = todayDate.getDate().toString();
        const todayDateFormatted = `${year}${splitter}${month}${splitter}${day}`;
        return todayDateFormatted;
    }

    static async getFutureDateInSequenceYYYYMMDD(days: number, splitter = '/') {
        const currentDate = new Date();
        await currentDate.setDate(currentDate.getDate() + days);
        let dateAltered: any = currentDate.getDate();
        let month: any = currentDate.getMonth() + 1; // January is 0!
        if (dateAltered < 10) {
            dateAltered = '0' + dateAltered;
        }
        if (month < 10) {
            month = '0' + month;
        }
        const year = currentDate.getFullYear();
        const futureDate = `${year}${splitter}${month}${splitter}${dateAltered}`;
        return futureDate;
    }
}
