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
		functiegegevens__landstandplaats: string,
		functiegegevens__einddatum__proeftijd: string,
		functiegegevens__CAO__gebied: string,
		functiegegevens__CAO__soort: string,
		functiegegevens__CAO__schaal: string,
		functiegegevens__salaristrede: string,
		functiegegevens__contracttype: string,
		functiegegevens__verhuisplicht: string,
		wachttijd: number = 500
	) {
		// -------------------------------------------------
		//	Invullen functie gegevens
		// -------------------------------------------------		
		await this.comboboxSelectie('Formatieplaats', functiegegevens__formatieplaats)		// Selecteren formatieplaats
		// Selecteren personeelssubgebied, alleen bij "functiegegevens__formatieplaats": "Beheerder ICT (50003393)"
		if (functiegegevens__formatieplaats == "Beheerder ICT (50003393)") {
			await this.comboboxSelectie('Personeelssubgebied', functiegegevens__personeelssubgebied)
		}
		await this.comboboxSelectie('Contractsoort', functiegegevens__contractsoort)	// Selecteren contractsoort
		await this.comboboxSelectie('Contracttype', functiegegevens__contracttype)	// Selecteren contracttype
		await this.comboboxSelectie('Medewerkersgroep', functiegegevens__medewerkersgroep)	// Selecteren medewerkersgroep
		await this.comboboxSelectie('Medewerkerssubgroep', functiegegevens__medewerkerssubgroep, 3)	// Selecteren medewerkerssubgroep
		// Vul de einddatum van het contract in
		if (await this.page.getByRole('textbox', { name: 'Einddatum contract' }).isVisible() == true) {
			await this.fillTextBox('Einddatum contract', newDate)
		}
		// Vul de einddatum van de proeftijd in
		if (await this.page.getByRole('textbox', { name: 'Einddatum proeftijd' }).isVisible() == true) {
			await this.fillTextBox('Einddatum proeftijd', functiegegevens__einddatum__proeftijd)
		}
		await this.fillTextBox('Basis werkuren per week', functiegegevens__basis_werkuren_per_week)	// Vul de basis werkuren per week in
		await this.fillTextBox('Werkdagen per week', functiegegevens__werkdagen_per_week)	// Vul de werkdagen per week in
		await this.fillTextBox('FTE - berekening Payroll', functiegegevens__FTE)	// Vul de FTE in
		await this.comboboxSelectie('CAO-gebied', functiegegevens__CAO__gebied)	// Selecteer CAO-gebied
		await this.comboboxSelectie('CAO-soort', functiegegevens__CAO__soort)	// Selecteer CAO-soort
		await this.comboboxSelectie('CAO-schaal', functiegegevens__CAO__schaal, 2)	// Selecteer CAO-schaal
		await this.comboboxSelectie('Salaristrede', functiegegevens__salaristrede, 2)	// Selecteer Salaristrede

		// Selecteer uitgesloten van automatisch verhogingen
		await this.comboboxOptionSelection('Uitgesloten van automatische', functiegegevens__uitgesloten_van_automatische_verhogingen, 2)
		await this.fillTextBox('Standplaats', functiegegevens__standplaats)	// Vul de standplaats in
		await this.comboboxOptionSelection('Land standplaats', functiegegevens__landstandplaats)	// Selecteer Land standplaats
		await this.comboboxOptionSelection('Verhuisplicht', functiegegevens__verhuisplicht)	// Selecteer verhuisplicht
	}

	async Werkrelaties(
		werkrelaties__type_relatie: string,
		werkrelaties__naam: string,
		wachttijd: number = 500
	) {
		// -------------------------------------------------
		// Invullen werkrelaties
		// -------------------------------------------------	
		await this.clickButton('Werkrelaties Toevoegen')	// Knop toevoegen
		await this.comboboxOptionSelection('Type relatie', werkrelaties__type_relatie, 3)	// Selectie van het type relatie

		// Selecteer de naam van de relatie
		await this.fillTextBox('Naam', werkrelaties__naam)
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
		await this.comboboxOptionSelection('Land/regio', werkvergunning__land)	// Selecteer het land/regio
		await this.comboboxOptionSelection('Documenttype', werkvergunning__documenttype)	// Selecteer het documenttype
		await this.fillTextBox('Documentnummer', werkvergunning__documentnummer)	// Vul het documentnummer in
		await this.fillTextBox('Uitgiftedatum/begindatum', uitgiftedatum)	// Vul de uitgiftedatum in
		await this.fillTextBox('Uitgevende instantie', werkvergunning__uitgevende_instantie)	// Vul de naam van de uitgevende instantie in
		await this.fillTextBox('Vervaldatum', vervaldatum)	// Vul de vervaldatum in
	}

	async Beloning(
		beloning__bedrag: string,
		wachttijd: number = 500
	) {
		// -------------------------------------------------
		// Invullen beloning
		// -------------------------------------------------
		await this.fillLocator('#__field0-inner', beloning__bedrag)	// Vul het bedrag van de beloning in
		await this.clickButton('Verwijderen Beloning 2')	// Verwijder overtollige regel
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
		await this.comboboxSelectie('Bankland', betalingsinformatie__bankland)	// Invullen bankland
		await this.fillTextBox('IBAN', betalingsinformatie__IBAN)	// Invullen IBAN
		await this.fillTextBox('Rekeninghouder', betalingsinformatie__naam_rekeninghouder)	// Invullen naam rekeninghouder

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