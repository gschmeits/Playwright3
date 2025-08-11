import { Page } from "@playwright/test";
import BasePage from "./basePage";
require("dotenv").config();

export class BasisgegevensPage extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	async Basisgegevens(
		basisgegevens__datum_in_dienst: string,
		basisgegevens__bedrijf: string,
		basisgegevens__gebeurtenisreden: string,
		basisgegevens__sjabloon: string,
		searchFor: string,
		wachttijd: number = 1000
	) {
		// -------------------------------------------------
		// Nieuwe medewerker toevoegen
		// -------------------------------------------------

		//  Vul de datum in
		await this.page
			.getByRole("textbox", { name: "Datum van indienstname" })
			.fill(basisgegevens__datum_in_dienst);
		await this.page.waitForTimeout(wachttijd);

		// Selecteer de naam van het bedrijf
		await this.page.locator("#__box0-arrow").click();
		await this.page.getByText(basisgegevens__bedrijf).click();
		await this.page.waitForTimeout(wachttijd);

		// Selecteer de gebeurtenisreden
		await this.page.locator("#__box1-arrow").click();
		await this.page.getByText(basisgegevens__gebeurtenisreden).click();
		await this.page.waitForTimeout(wachttijd);

		// Selecteer het sjabloon
		await this.page.locator("#__box2-arrow").click();
		await this.page.getByText(basisgegevens__sjabloon).click();
		await this.page.waitForTimeout(wachttijd);

		// Druk op de knop om door te gaan
		await this.page.getByRole("button", { name: "Doorgaan" }).click();
		await this.page.waitForTimeout(wachttijd);
	}

	async Naamgegevens(
		naamsgegevens__titel: string,
		naamsgegevens__voornaam: string,
		naamsgegevens__achternaam: string,
		wachttijd: number = 1000) {
		// -------------------------------------------------
		// Invullen naamsgegevens
		// -------------------------------------------------
		// Selecteer de aanhef
		await this.page.getByRole('form', { name: 'Naamgegevens' }).getByLabel('Opties selecteren').click();
		await this.page.getByText(naamsgegevens__titel).click();

		// Vul de roepnaam in
		await this.page.getByRole('textbox', { name: 'Roepnaam' }).click();
		await this.page.getByRole('textbox', { name: 'Roepnaam' }).fill(naamsgegevens__voornaam);

		// Vul de achternaam in		
		await this.page.getByRole('textbox', { name: 'Geboortenaam (zonder' }).click();
		await this.page.getByRole('textbox', { name: 'Geboortenaam (zonder' }).fill(naamsgegevens__achternaam);
	}

	async Persoonsgegevens(
		persoonsgegevens__geboortedatum: string,
		persoonsgegevens__geboorteland: string,
		persoonsgegevens__geboorteplaats: string,
		wachttijd: number = 1000) {
		// -------------------------------------------------
		// Invullen persoonsgegevens
		// -------------------------------------------------

		// Vul de geboortedatum in
		await this.page.getByRole('textbox', { name: 'Geboortedatum' }).click();
		await this.page.getByRole('textbox', { name: 'Geboortedatum' }).fill(persoonsgegevens__geboortedatum);

		// Selecteer het geboorteland
		await this.page.getByRole('combobox', { name: 'Geboorteland' }).click();
		await this.page.waitForTimeout(wachttijd);
		await this.page.getByRole('combobox', { name: 'Geboorteland' }).fill(persoonsgegevens__geboorteland);
		await this.page.waitForTimeout(wachttijd);
		await this.page.getByText('Nederland', { exact: true }).click();

		// Vul de geboorteplaats in
		await this.page.getByRole('textbox', { name: 'Geboorteplaats' }).click();
		await this.page.getByRole('textbox', { name: 'Geboorteplaats' }).fill(persoonsgegevens__geboorteplaats);
	}

	async BSNgegevens(
		burger_service_nummer__landregio: string,
		burger_service_nummer__identiteitstype: string,
		burger_service_nummer__BSN: string,
		burger_service_nummer__is_primair: string,
		wachttijd: number = 500) {
		// -------------------------------------------------
		// Invullen burger service nummer
		// -------------------------------------------------

		// Druk op Burger Service Nummer
		await this.page.getByRole('button', { name: 'Burger Service Nummer (BSN)' }).click();
		await this.page.waitForTimeout(wachttijd);
		// Selecteer land/regio
		await this.page.getByRole('gridcell', { name: 'Land/regio' }).getByLabel('Opties selecteren').click();
		await this.page.waitForTimeout(wachttijd);
		await this.page.getByRole('option', { name: burger_service_nummer__landregio }).click()
		await this.page.waitForTimeout(wachttijd);
		// Selecteer het indentiteitstype
		await this.page.getByRole('gridcell', { name: 'Identiteitstype' }).getByLabel('Opties selecteren').click();
		await this.page.waitForTimeout(wachttijd);
		await this.page.getByText(burger_service_nummer__identiteitstype).click();
		await this.page.waitForTimeout(wachttijd);

		// Vul het BSN nummer in		
		await this.page.getByRole('textbox', { name: 'BSN' }).fill(burger_service_nummer__BSN);
		await this.page.waitForTimeout(wachttijd);

		// Selecteer is primair
		await this.page.getByRole('gridcell', { name: 'Is primair' }).getByLabel('Opties selecteren').click();
		await this.page.waitForTimeout(wachttijd);
		await this.page.getByRole('option', { name: burger_service_nummer__is_primair }).locator('div').nth(2).click();
		await this.page.waitForTimeout(wachttijd);
	}
}
