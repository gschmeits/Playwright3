import { Page } from "@playwright/test";
import BasePage from "./basePage";
require("dotenv").config();

export class FunctiegegevensPage extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	async Functiegegevens(functiegegevens__formatieplaats: string,
		functiegegevens__personeelssubgebied: string,
		functiegegevens__contractsoort: string,
		functiegegevens__medewerkersgroep: string,
		functiegegevens__medewerkerssubgroep: string,
		newDate: string,
		functiegegevens__basis_werkuren_per_week: string,
		functiegegevens__werkdagen_per_week: string,
		functiegegevens__FTE: string,
		functiegegevens__uitgesloten_van_automatische_verhogingen: string,
		functiegegevens__standplaats: string,
		wachttijd: number = 500
	) {
		// -------------------------------------------------
		//	Invullen functie gegevens
		// -------------------------------------------------		

		// Selecteren formatieplaats
		var functieC = functiegegevens__formatieplaats
		if (functiegegevens__formatieplaats.indexOf('(') > 0) {
			var functiegegevensA = functiegegevens__formatieplaats.split('(')
			var functieB = functiegegevensA[1]
			functieC = functieB.replace(')', '')
		}
		await this.page.getByRole('combobox', { name: 'Formatieplaats' }).fill(functieC);
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByText(functiegegevens__formatieplaats, { exact: true }).click();
		await this.page.waitForTimeout(wachttijd)
		// Selecteren personeelssubgebied, alleen bij "functiegegevens__formatieplaats": "Beheerder ICT (50003393)"
		if (functiegegevens__formatieplaats == "Beheerder ICT (50003393)") {
			var personeelssubgebied = functiegegevens__personeelssubgebied
			var personeelssubgebied5 = personeelssubgebied.substring(0, 5)
			await this.page.getByRole('combobox', { name: 'Personeelssubgebied' }).click();
			await this.page.waitForTimeout(wachttijd)
			await this.page.getByRole('combobox', { name: 'Personeelssubgebied' }).fill(personeelssubgebied5);
			await this.page.waitForTimeout(wachttijd)
			await this.page.getByText(functiegegevens__personeelssubgebied, { exact: true }).click();
			await this.page.waitForTimeout(wachttijd)
		}

		// Selecteren contractsoort
		await this.page.locator('#__box39-arrow').click()
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByText(functiegegevens__contractsoort, { exact: true }).click();
		await this.page.waitForTimeout(wachttijd)

		// Selecteren medewerkersgroep
		await this.page.locator('#__box41-arrow').click()
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByText(functiegegevens__medewerkersgroep).click();
		await this.page.waitForTimeout(wachttijd)

		// Selecteren medewerkerssubgroep
		await this.page.locator('#__box42-arrow').click()
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByText(functiegegevens__medewerkerssubgroep).click();
		await this.page.waitForTimeout(wachttijd)

		// Vul de einddatum van het contract in
		if (await this.page.locator('#__picker9-inner').isVisible() == true) {
			await this.page.locator('#__picker9-inner').fill(newDate)
			await this.page.waitForTimeout(wachttijd)
		}

		// Vul de basis werkuren per week in
		await this.page.locator('#__input44-inner').fill(functiegegevens__basis_werkuren_per_week)
		await this.page.waitForTimeout(wachttijd)
		// Vul de werkdagen per week in
		await this.page.locator('#__input45-inner').fill(functiegegevens__werkdagen_per_week)
		await this.page.waitForTimeout(wachttijd)
		// Vul de FTE in
		await this.page.locator('#__input46-inner').fill(functiegegevens__FTE)
		await this.page.waitForTimeout(wachttijd)
		// Selecteer uitgesloten van automatisch verhogingen
		if (await this.page.locator('#__box47-arrow').isVisible) {
			await this.page.locator('#__box47-arrow').click()
			await this.page.waitForTimeout(wachttijd)
			await this.page.getByRole('option', { name: functiegegevens__uitgesloten_van_automatische_verhogingen }).click();
			await this.page.waitForTimeout(wachttijd)
		}
		// Vul de standplaats in
		await this.page.locator('#__input47-inner').fill(functiegegevens__standplaats)
		await this.page.waitForTimeout(wachttijd)
	}

	async Werkrelaties(
		werkrelaties__type_relatie: string,
		werkrelaties__naam: string,
		wachttijd: number = 500
	) {
		// -------------------------------------------------
		// Invullen werkrelaties
		// -------------------------------------------------	

		// Knop toevoegen	
		await this.page.locator('#__button65-inner').click()
		await this.page.waitForTimeout(wachttijd)

		// Selectie van het type relatis 
		await this.page.locator('#__box72-arrow').click()
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByText(werkrelaties__type_relatie, { exact: true }).click();
		await this.page.waitForTimeout(wachttijd)

		// Selecteer de naam van de relatie
		await this.page.locator('#__input68-inner').fill(werkrelaties__naam)
		await this.page.waitForTimeout(wachttijd)
		await this.page.locator('#__result0').click()
		await this.page.waitForTimeout(wachttijd)
	}

	async Werkvergunning(werkvergunning__land: string,
		werkvergunning__documenttype: string,
		werkvergunning__documentnummer: string,
		uitgiftedatum: string,
		werkvergunning__uitgevende_instantie: string,
		vervaldatum: string,
		wachttijd: number = 500
	) {
		// -------------------------------------------------
		// Invullen werkvergunning
		// -------------------------------------------------

		// Selecteer het land/regio
		var landkort = werkvergunning__land.substring(0, 5)
		await this.page.getByRole('combobox', { name: 'Land/regio', exact: true }).fill(landkort);
		await this.page.waitForTimeout(wachttijd)
		await this.page.locator("#__item457-titleText").click()
		await this.page.waitForTimeout(wachttijd)
		// Selecteer het documenttype
		var documentkort = werkvergunning__documenttype.substring(0, 5)
		await this.page.getByRole('combobox', { name: 'Documenttype', exact: true }).fill(documentkort);
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByRole('option', { name: werkvergunning__documenttype }).click();
		await this.page.waitForTimeout(wachttijd)

		// Vul het documentnummer in
		await this.page.locator("#__input63-inner").fill(werkvergunning__documentnummer)
		await this.page.waitForTimeout(wachttijd)
		// Vul de uitgiftedatum in
		await this.page.locator("#__picker29-inner").fill(uitgiftedatum)
		await this.page.waitForTimeout(wachttijd)
		// Vul de naam van de uitgevende instantie in
		await this.page.locator('#__input65-inner').fill(werkvergunning__uitgevende_instantie)
		await this.page.waitForTimeout(wachttijd)
		// Vul de vervaldatum in
		await this.page.locator('#__picker30-inner').fill(vervaldatum)
		await this.page.waitForTimeout(wachttijd)
	}

	async Beloning(
		beloning__bedrag: string,
		wachttijd: number = 500
	) {
		// -------------------------------------------------
		// Invullen beloning
		// -------------------------------------------------

		// Vul het bedrag van de beloning in
		await this.page.locator('#__field0-inner').click();
		await this.page.waitForTimeout(wachttijd)
		await this.page.locator('#__field0-inner').fill(beloning__bedrag);
		await this.page.keyboard.down('Enter')

		// Verwijder overtollige regel
		await this.page.getByRole('button', { name: 'Verwijderen Beloning 2' }).click();
		await this.page.waitForTimeout(wachttijd)
	}

	async Betalingsgegevens(
		betalingsinformatie__bankland: string,
		betalingsinformatie__IBAN: string,
		betalingsinformatie__naam_rekeninghouder: string,
		wachttijd: number = 500
	) {
		// -------------------------------------------------
		// Invullen betalingsgegevens
		// -------------------------------------------------

		// Invullen bankland
		await this.page.getByRole('combobox', { name: 'Bankland' }).click();
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByRole('combobox', { name: 'Bankland' }).fill(betalingsinformatie__bankland.substring(0, 5));
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByText(betalingsinformatie__bankland).click();
		await this.page.waitForTimeout(wachttijd)
		// Invullen IBAN
		await this.page.getByRole('textbox', { name: 'IBAN' }).click();
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByRole('textbox', { name: 'IBAN' }).fill(betalingsinformatie__IBAN);
		await this.page.waitForTimeout(wachttijd)

		// Invullen naam rekeninghouder
		await this.page.getByRole('textbox', { name: 'Rekeninghouder' }).click();
		await this.page.waitForTimeout(wachttijd)
		await this.page.getByRole('textbox', { name: 'Rekeninghouder' }).fill(betalingsinformatie__naam_rekeninghouder);
		await this.page.waitForTimeout(wachttijd)

	}
	async UploadIdentiteitPDF(filename: string) {
		// Directory waar het pdf bestand staat
		var uploadDirectory = process.env.UPLOAD_DIRECTORY
		// Upload een pdf bestand
		let [fileChooser] = await Promise.all([
			this.page.waitForEvent('filechooser'),
			this.page.locator('#__pp1-1-uploader-fu_button').click(),
		]);
		await fileChooser.setFiles([`${uploadDirectory}${filename}`]);
	}

}