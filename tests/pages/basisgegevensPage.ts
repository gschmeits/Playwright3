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

		await this.comboboxSelectie('Bedrijf', basisgegevens__bedrijf, 15)
		await this.comboboxSelectie('Gebeurtenisreden', basisgegevens__gebeurtenisreden, 15)
		await this.comboboxSelectie('Sjabloon', basisgegevens__sjabloon, 10)
		await this.Doorgaan()
	}

	async Naamgegevens(
		naamsgegevens__titel: string,
		naamsgegevens__voornaam: string,
		naamsgegevens__achternaam: string,
		wachttijd: number = 1000) {
		// -------------------------------------------------
		// Invullen naamsgegevens
		// -------------------------------------------------
		await this.comboboxSelectie('Aanhef', naamsgegevens__titel, 3)					// Selecteer de aanhef
		await this.fillTextBox('Roepnaam', naamsgegevens__voornaam)						// Vul de roepnaam in
		await this.fillTextBox('Geboortenaam (zonder voorvoegsel)', naamsgegevens__achternaam)		// Vul de achternaam in	
	}

	async Persoonsgegevens(
		persoonsgegevens__geboortedatum: string,
		persoonsgegevens__geboorteland: string,
		persoonsgegevens__geboorteplaats: string,
		wachttijd: number = 1000) {
		// -------------------------------------------------
		// Invullen persoonsgegevens
		// -------------------------------------------------
		await this.fillTextBox('Geboortedatum', persoonsgegevens__geboortedatum)		// Vul de geboortedatum in
		await this.comboboxSelectie('Geboorteland', persoonsgegevens__geboorteland)		// Selecteer het geboorteland
		await this.fillTextBox('Geboorteplaats', persoonsgegevens__geboorteplaats)		// Vul de geboorteplaats in
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

		// Druk op Burger Service Nummer Toevoegen
		await this.clickButton('Burger Service Nummer (BSN)')

		// Selecteer land/regio
		await this.page.getByRole('gridcell', { name: 'Land/regio' }).getByLabel('Opties selecteren').click();
		await this.page.waitForTimeout(wachttijd);
		await this.page.getByRole('option', { name: burger_service_nummer__landregio }).click()
		await this.page.waitForTimeout(wachttijd);

		await this.comboboxOptionSelection('Identiteitstype', burger_service_nummer__identiteitstype)	// Selecteer het indentiteitstype
		await this.fillTextBox('BSN', burger_service_nummer__BSN)	// Vul het BSN nummer in
		await this.comboboxOptionSelection('Is primair', burger_service_nummer__is_primair)		// Selecteer is primair
		await this.page.waitForTimeout(1000)
	}
}
