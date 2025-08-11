import { Locator, Page, expect } from "@playwright/test";
require("dotenv").config();

export default class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async gaNaarZoekTextBox(searchObject: string, medewerkersgroep:string='BEZOLDIGD PERSONEEL (A)') {
        if (medewerkersgroep === 'BEZOLDIGD PERSONEEL (A)') {
            searchObject = 'Nieuwe medewerker toevoegen'
        }
        // Vul de zoekbalk in
        await this.page
            .getByRole("textbox", { name: "De zoekresultaten van ‘" })
            .click();
        await this.page
            .getByRole("textbox", { name: "De zoekresultaten van ‘" })
            .fill(searchObject);
    }

    async searchBox(searchObject: string, medewerkersgroep: string = 'BEZOLDIGD PERSONEEL (A)', wachttijd: number = 1000) {
        if (medewerkersgroep === 'BEZOLDIGD PERSONEEL (A)') {
            searchObject = 'Nieuwe medewerker toevoegen'
        }
        await this.page.waitForTimeout(wachttijd)

        await this.page.getByText(searchObject).first().click();

        if (medewerkersgroep === 'Gastvrijheid ovk (B)') {
            await this.page.locator('#__button2-BDI-content').click() // acties
            await this.page.getByText('Gelijktijdige betrekking toevoegen').click()
        }
    }

    async Doorgaan() {
        // Druk op de knop Doorgaan
        await this.page.getByRole('button', { name: 'Doorgaan' }).click();
        await this.page.waitForTimeout(1000)
    }

    async Doorvoeren() {
        // Druk op de knop Doorvoeren
        await this.page.getByRole('button', { name: 'Doorvoeren' }).click();
        await this.page.waitForTimeout(1000)
    }


    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async clickElement(element: Locator | string) {
        if (typeof element === "string") {
            await this.page.locator(element).click();
        } else {
            await element.click();
        }
    }

    async expectForbiddenPage() {
        await expect(
            this.page.getByRole("heading", { name: "Forbidden" }),
        ).toBeVisible();
        await expect(this.page.getByRole("paragraph")).toContainText(
            "We're sorry, you are not authorized to view this page.",
        );
    }

    async deleteElement(element: Locator | string) {
        if (typeof element === "string") {
            await this.page.locator(`${element}`).click();
        } else {
            await element.click();
        }

        await this.page.locator("#yes").click();
    }

    async fillField(
        element: Locator | string,
        value: string,
        option: boolean = true,
    ) {
        if (typeof element === "string") {
            if (option === true) {
                await this.page.locator(`${element}`).clear();
            }
            await this.page.locator(`${element}`).fill(value)
        } else {
            if (option === true) {
                await element.clear();
            }
            await element.fill(value);
        }
    }

    async selectOptionBase(element: Locator, value: string) {
        await element.selectOption(value);
    }

    async selectOptionNewLabel(element: string, value: string) {
        await this.page.locator(`${element}`).selectOption({ label: value });
    }

    async getElementText(element: Locator): Promise<string> {
        return element.innerText();
    }

    async waitForElementVisible(element: Locator | string) {
        if (typeof element === "string") {
            await this.page.waitForSelector(element, { state: "visible" });
        } else {
            await element.waitFor({ state: "visible" });
        }
    }

    async expectContainText(element: Locator | string, value: string) {
        if (typeof element === "string") {
            await expect(this.page.locator(element)).toContainText(value);
        } else {
            await expect(element).toContainText(value);
        }
    }

    async expectToHaveValue(element: Locator | string, value: string) {
        if (typeof element === "string") {
            await expect(this.page.locator(element)).toHaveValue(value);
        } else {
            await expect(element).toHaveValue(value);
        }
    }

    async expectElementVisible(element: Locator | string) {
        if (typeof element === "string") {
            await expect(this.page.locator(`${element}`)).toBeVisible();
        } else {
            await expect(element).toBeVisible();
        }
    }

    async waitForElement(element: Locator | string) {
        if (typeof element === "string") {
            await this.page.locator(`${element}`).waitFor();
        } else {
            await element.waitFor();
        }
    }

    async expectToHaveCount(element: Locator | string, counter: number) {
        if (typeof element === "string") {
            await expect(this.page.locator(`${element}`)).toHaveCount(counter);
        } else {
            await expect(element).toHaveCount(counter);
        }
    }

    async pressKey(element: Locator | string, keyToPress: string) {
        if (typeof element === "string") {
            await this.page.locator(`${element}`).press(keyToPress)
        } else {
            await element.press(keyToPress)
        }
    }

    async checkUncheckCheckBox(element: Locator | string, choice: boolean = true) {
        if (typeof element === 'string') {
            if (choice === true) {
                await this.page.locator(element).check()
            }
            if (choice === false) {
                await this.page.locator(element).uncheck()
            }
        } else {
            if (choice === true) {
                await element.check()
            } else {
                await element.uncheck()
            }
        }
    }

    async searchValueTable(tekst: string) {
        await this.page.waitForSelector('[name="q"]');
        await this.page.locator('[name="q"]').fill(tekst);
        await this.page.locator('[data-cy="search_button_submit"]').click();
    }
}

export function titelNaam(teller: number, voornaam: string, achternaam: string, groep: string): string {
    // Stel een teller in
    var teller1 = teller + 1
    var teller2 = '' + teller1
    // Zet er een 0 voor indien teller kleiner dan 10 is
    if (teller1 < 10) {
        teller2 = '0' + teller1
    }
    // Vervang spaties door '_'
    let group = groep.replace(' ', '_')
    return teller2 + '_' + voornaam + '_' + achternaam + '_' + group
}

export function datum(days: number = 0, months: number = 0, years: number = 0): string {
    // Datum van vandaag
    const date = new Date()
    date.setDate(date.getDate() + days)
    date.setMonth(date.getMonth() + months)
    date.setFullYear(date.getFullYear() + years)
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear()
    var newDate = dd + mm + yyyy;
    return newDate
}