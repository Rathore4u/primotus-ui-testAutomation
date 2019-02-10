import { By, element } from 'protractor';

export class GridElements {

    static getAllTableColumnHeaders(tableNameClassOrId: string) {
        const columnSelector = By.css(
            `.${tableNameClassOrId}:last-of-type th`);
        return element.all(columnSelector);
    }

    static getTableRowSelector(name: string, description: string) {
        const xpath = `//tr[descendant::*[text()='${name}'] `
            + `and descendant::td[text()='${description}']]`;
        return element.all(By.xpath(xpath)).first();
    }

    static getLinkForRowData(rowData: string, linkText: string) {
        const xpath = `//tr[descendant::a[text()='${rowData}']]`
            + `//a[text()='${linkText}']`;
        return element(By.xpath(xpath));
    }

    static getColumnByOtherColumn(
        sourceColData: string, targetColData: string
    ) {
        const sourceXpath = `//tr[descendant::*[normalize-space(text())='${sourceColData}']]`;
        const targetXpath = `//*[normalize-space(text())='${targetColData}']`;
        const xpath = `${sourceXpath}${targetXpath}`;
        return element(By.xpath(xpath));
    }
}
