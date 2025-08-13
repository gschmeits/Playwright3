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
		wachttijd: number = 500
	) {
		// -------------------------------------------------
		// Invullen persoonlijke gegevens
		// -------------------------------------------------
		await this.fillTextBox('Initialen (met punten ertussen)', persoonlijke_gegevens__initialen)								// Vul de initialen in
		await this.fillTextBox('Voornamen', persoonlijke_gegevens__voornamen)													// Vul de voornamen in
		await this.comboboxSelectie('Communicatienaam (' ,persoonlijke_gegevens__communicatienaam)								// Selecteer de communicatie naam
		await this.comboboxSelectieLabel('Nationaliteit', 'Nationaliteit is verplicht', persoonlijke_gegevens__nationaliteit) 	// Selecteer de nationaliteit
		await this.comboboxSelectie('Communicatietaal', persoonlijke_gegevens__communicatietaal)								// Selecteer de communicatietaal
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
		await this.clickButton('E-mailgegevens Toevoegen')								// Druk Toevoegen
		await this.comboboxSelectie('Soort e-mail', emailgegevens__soort_email)			// Selecteer het soort email adres
		await this.fillTextBox('E-mailadres',emailgegevens__emailadres.trim() )			// Vul het email adres in
		await this.optionSelectie('Is primair', emailgegevens__is_primair)				// Selecteer is primair
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
		await this.clickButton('Telefoongegevens toevoegen')							// Druk op toevoegen telefoon	
		await this.comboboxSelectie('Soort telefoon', telefoongegevens__soort_telefoon)	// Selecteer het soort telefoon
		await this.fillTextBox('Telefoonnummer',telefoongegevens__telefoonnummer )		// Vul het telefoonnummer in
		await this.optionLocator('#__box28-arrow', telefoongegevens__is_primair, 2)		// Selecteer is primair
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
		await this.fillTextBox('Straat', adressen__straat)								// Vul de straatnaam in
		await this.fillTextBox('Huisnummer', adressen__huisnummer )						// Vul het huisnummer in
		await this.fillTextBox('Postcode (xxxx xx)', adressen__postcode)				// Vul de postcode in
		await this.fillTextBox('Plaats', adressen__plaats, true)						// Vul de plaatsnaam in
	}
}