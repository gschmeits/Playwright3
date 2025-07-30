import { Page } from "@playwright/test";
import BasePage from "./basePage";
require("dotenv").config();

export class PersoonlijkegegevensPage extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	async Persoonlijkegegevens(
		persoonlijke_gegevens__initialen: string,
		persoonlijke_gegevens__voornamen: string,
		persoonlijke_gegevens__communicatienaam: string,
		persoonlijke_gegevens__nationaliteit: string,
		persoonlijke_gegevens__communicatietaal: string,
		wachttijd: number = 1000
	) {
		// -------------------------------------------------
		// Invullen persoonlijke gegevens
		// -------------------------------------------------

		// Vul de initialen in
		await this.page.getByRole('textbox', { name: 'Initialen (met punten' }).click();
		await this.page.getByRole('textbox', { name: 'Initialen (met punten' }).fill(persoonlijke_gegevens__initialen);

		// Vul de voornamen in
		await this.page.getByRole('textbox', { name: 'Voornamen' }).click();
		await this.page.getByRole('textbox', { name: 'Voornamen' }).fill(persoonlijke_gegevens__voornamen);

		// Selecteer de communicatie naam
		await this.page.locator('#__box14-arrow').click();
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByText(persoonlijke_gegevens__communicatienaam).click();
		await this.page.waitForTimeout(wachttijd)
		// Selecteer de nationaliteit
		await this.page.getByRole('combobox', { name: 'Nationaliteit', exact: true }).fill(persoonlijke_gegevens__nationaliteit.substring(0, 5));
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByLabel('Nationaliteit is verplicht').getByText(persoonlijke_gegevens__nationaliteit, { exact: true }).click();
		await this.page.waitForTimeout(wachttijd)
		// Selecteer de communicatietaal
		var communicatietaal = persoonlijke_gegevens__communicatietaal
		await this.page.getByRole('combobox', { name: 'Communicatietaal' }).click();
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByRole('combobox', { name: 'Communicatietaal' }).fill(communicatietaal.substring(0, 5));
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByText(persoonlijke_gegevens__communicatietaal, { exact: true }).click();
		await this.page.waitForTimeout(wachttijd)
	}

	async Emailgegevens(
		emailgegevens__soort_email: string,
		emailgegevens__emailadres: string,
		emailgegevens__is_primair: string,
		wachttijd: number = 500
	) {
		// -------------------------------------------------		
		// Invullen email gegevens
		// -------------------------------------------------

		// Selecteer het soort email adres
		await this.page.getByRole('button', { name: 'E-mailgegevens Toevoegen' }).click();
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByRole('gridcell', { name: 'Soort e-mail' }).getByLabel('Opties selecteren').click();
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByRole('option', { name: emailgegevens__soort_email }).locator('div').nth(1).click();
		await this.page.waitForTimeout(wachttijd)

		// Vul het email adres in
		await this.page.getByRole('textbox', { name: 'E-mailadres' }).click();
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByRole('textbox', { name: 'E-mailadres' }).fill(emailgegevens__emailadres.trim());
		await this.page.waitForTimeout(wachttijd)
		// Selecteer is primair
		await this.page.getByRole('gridcell', { name: 'Is primair' }).getByLabel('Opties selecteren').click();
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByRole('option', { name: emailgegevens__is_primair }).locator('div').nth(1).click();
		await this.page.waitForTimeout(wachttijd)
	}

	async Telefoongegevens(
		telefoongegevens__soort_telefoon: string,
		telefoongegevens__telefoonnummer: string,
		telefoongegevens__is_primair: string,
		wachttijd: number = 500
	) {
		// -------------------------------------------------		
		// Invullen telefoon gegevens
		// -------------------------------------------------

		// Selecteer het soort telefoon
		await this.page.getByRole('button', { name: 'Telefoongegevens Toevoegen' }).click();
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByRole('gridcell', { name: 'Soort telefoon' }).getByLabel('Opties selecteren').click();
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByText(telefoongegevens__soort_telefoon).click();
		await this.page.waitForTimeout(wachttijd)

		// Vul het telefoonnummer in
		await this.page.getByRole('textbox', { name: 'Telefoonnummer' }).click();
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByRole('textbox', { name: 'Telefoonnummer' }).fill(telefoongegevens__telefoonnummer);
		await this.page.waitForTimeout(wachttijd)

		// Selecteer is primair
		await this.page.locator('#__box28-arrow').click();
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByRole('option', { name: telefoongegevens__is_primair }).locator('div').nth(2).click();
		await this.page.waitForTimeout(wachttijd)
	}

	async Adresgegevens(
		adressen__straat: string,
		adressen__huisnummer: string,
		adressen__postcode: string,
		adressen__plaats: string,
		wachttijd: number = 1000
	) {
		// -------------------------------------------------
		// Invullen adres gegevens
		// -------------------------------------------------

		// Vul de straatnaam in
		await this.page.getByRole('textbox', { name: 'Straat' }).click();
		await this.page.getByRole('textbox', { name: 'Straat' }).fill(adressen__straat);

		// Vul het huisnummer in
		await this.page.getByRole('textbox', { name: 'Huisnummer' }).click();
		await this.page.getByRole('textbox', { name: 'Huisnummer' }).fill(adressen__huisnummer);

		// Vul de postcode in
		await this.page.getByRole('textbox', { name: 'Postcode (xxxx xx)' }).click();
		await this.page.getByRole('textbox', { name: 'Postcode (xxxx xx)' }).fill(adressen__postcode);
		await this.page.getByRole('textbox', { name: 'Postcode (xxxx xx)' }).press('Tab');

		// Vul de plaatsnaam in
		await this.page.getByRole('textbox', { name: 'Plaats', exact: true }).fill(adressen__plaats);
	}
}