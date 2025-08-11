import { test } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { BasisgegevensPage } from './pages/basisgegevensPage';
import { titelNaam, datum } from "./pages/basePage";
import { PersoonlijkegegevensPage } from './pages/persoonlijkegegevensPage';
import { FunctiegegevensPage } from './pages/functiegegevensPage';
import { DoorvoerPage } from './pages/doorvoerPage';

try {
	// Haal de gegevens van de medewerkers uit het bestand
	const personsData = require("../test-data/persons.json")

	// Wijs de data toe aan variabele 'personsList' met als functiegegevens_medewerkersgroeps = "Bezoldigd personeel (A)"
	const personsList = personsData.filter((item: { functiegegevens__medewerkersgroep: string; }) => item.functiegegevens__medewerkersgroep === "Bezoldigd personeel (A)");

	// Acties voordat de gegevens toegevoegd worden
	test.beforeEach('test', async ({ page }) => {
		const loginPage = new LoginPage(page)
		await loginPage.SuccessFactorsLogin()
		await loginPage.gaNaarZoekTextBox("Nieuwe medewerker toevoegen")
	});

	// Acties nadat de gegevens zijn ingevoerd
	test.afterEach('test', async ({ page }) => {
		// Sluit de browser
		await page.close()
	})

	// Herhaal de stappen zo vaak als dat er records zijn in 'personsList' met medewerkersgroep 'Bezoldigd personeel (A)'
	for (let teller = 1; teller < 2; teller++) {
		// Boudewijn Brons en Helen Honing staan er al in, dus niet meenemen in de run
		if (teller != 8 && teller != 9) {
			let naam = titelNaam(teller, personsList[teller]['naamsgegevens__voornaam'], personsList[teller]['naamsgegevens__achternaam'], personsList[teller]['functiegegevens__medewerkersgroep'])
			test('toevoegen_medewerker_' + naam, async ({ page }) => {
				const basisgegevensPage = new BasisgegevensPage(page)
				const persoonlijkegegevensPage = new PersoonlijkegegevensPage(page)
				const functiegegevensPage = new FunctiegegevensPage(page)
				const doorvoerPage = new DoorvoerPage(page)

				await basisgegevensPage.Basisgegevens(
					personsList[teller]['basisgegevens__datum_in_dienst'],
					personsList[teller]['basisgegevens__bedrijf'],
					personsList[teller]['basisgegevens__gebeurtenisreden'],
					personsList[teller]['basisgegevens__sjabloon'],
					"Nieuwe medewerker toevoegen")

				await basisgegevensPage.Naamgegevens(
					personsList[teller]['naamsgegevens__titel'],
					personsList[teller]['naamsgegevens__voornaam'],
					personsList[teller]['naamsgegevens__achternaam'])

				await basisgegevensPage.Persoonsgegevens(
					personsList[teller]['persoonsgegevens__geboortedatum'],
					personsList[teller]['persoonsgegevens__geboorteland'],
					personsList[teller]['persoonsgegevens__geboorteplaats'])

				await basisgegevensPage.BSNgegevens(
					personsList[teller]['burger_service_nummer__landregio'],
					personsList[teller]['burger_service_nummer__identiteitstype'],
					personsList[teller]['burger_service_nummer__BSN'],
					personsList[teller]['burger_service_nummer__is_primair'])

				await basisgegevensPage.Doorgaan()

				await page.waitForTimeout(500)

				// Specifiek voor groep A
				await persoonlijkegegevensPage.Persoonlijkegegevens(
					personsList[teller]['persoonlijke_gegevens__initialen'],
					personsList[teller]['persoonlijke_gegevens__voornamen'],
					personsList[teller]['persoonlijke_gegevens__communicatienaam'],
					personsList[teller]['persoonlijke_gegevens__nationaliteit'],
					personsList[teller]['persoonlijke_gegevens__communicatietaal'])

				await persoonlijkegegevensPage.Emailgegevens(
					personsList[teller]['emailgegevens__soort_email'],
					personsList[teller]['emailgegevens__emailadres'],
					personsList[teller]['emailgegevens__is_primair'])

				await persoonlijkegegevensPage.Telefoongegevens(
					personsList[teller]['telefoongegevens__soort_telefoon'],
					personsList[teller]['telefoongegevens__telefoonnummer'],
					personsList[teller]['telefoongegevens__is_primair']
				)

				await persoonlijkegegevensPage.Adresgegevens(
					personsList[teller]['adressen__straat'],
					personsList[teller]['adressen__huisnummer'],
					personsList[teller]['adressen__postcode'],
					personsList[teller]['adressen__plaats'])

				await persoonlijkegegevensPage.Doorgaan()

				await functiegegevensPage.Functiegegevens(
					personsList[teller]['functiegegevens__formatieplaats'],
					personsList[teller]['functiegegevens__personeelssubgebied'],
					personsList[teller]['functiegegevens__contractsoort'],
					personsList[teller]['functiegegevens__medewerkersgroep'],
					personsList[teller]['functiegegevens__medewerkerssubgroep'],
					datum(0, 0, 1),
					personsList[teller]['functiegegevens__basis_werkuren_per_week'],
					personsList[teller]['functiegegevens__werkdagen_per_week'],
					personsList[teller]['functiegegevens__FTE'],
					personsList[teller]['functiegegevens__uitgesloten_van_automatische_verhogingen'],
					personsList[teller]['functiegegevens__standplaats']
				)

				await functiegegevensPage.Werkrelaties(
					personsList[teller]['werkrelaties__type_relatie'],
					personsList[teller]['werkrelaties__naam']
				)

				await functiegegevensPage.Werkvergunning(
					personsList[teller]['werkvergunning__land'],
					personsList[teller]['werkvergunning__documenttype'],
					personsList[teller]['werkvergunning__documentnummer'],
					datum(1, 2, -2),
					personsList[teller]['werkvergunning__uitgevende_instantie'],
					datum(1, 2, 8)
				)

				await functiegegevensPage.Doorgaan()

				await functiegegevensPage.Beloning(
					personsList[teller]['beloning__bedrag']
				)

				await functiegegevensPage.Betalingsgegevens(
					personsList[teller]['betalingsinformatie__bankland'],
					personsList[teller]['betalingsinformatie__IBAN'],
					personsList[teller]['betalingsinformatie__naam_rekeninghouder']
				)

				await functiegegevensPage.UploadIdentiteitPDF(
					'foo.pdf'
				)

				// await functiegegevensPage.Doorvoeren()

				// await functiegegevensPage.Doorgaan()

				// await doorvoerPage.Reactietoevoegen(
				// 	naam
				// )

				// await doorvoerPage.Doorvoeren()

				// await doorvoerPage.ControleerMelding()

			})
		}
	}
}
catch (e) {
	console.log(e)
} 