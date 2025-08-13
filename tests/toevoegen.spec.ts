import { test } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { BasisgegevensPage } from './pages/basisgegevensPage';
import { titelNaam, datum } from "./pages/basePage";
import { PersoonlijkegegevensPage } from './pages/persoonlijkegegevensPage';
import { FunctiegegevensPage } from './pages/functiegegevensPage';
import { DoorvoerPage } from './pages/doorvoerPage';
import { text } from 'stream/consumers';

try {
	// Haal de gegevens van de medewerkers uit het bestand
	const personsData = require("../test-data/persons.json")

	// Wijs de data toe aan variabele 'personsList' met als functiegegevens_medewerkersgroeps = "Gastvrijheid ovk (B)"
	// const personsList = personsData.filter((item: { functiegegevens__medewerkersgroep: string; }) => item.functiegegevens__medewerkersgroep === "Gastvrijheid ovk (B)");
	const personsList = personsData

	// Acties voordat de gegevens toegevoegd worden
	test.beforeEach('test', async ({ page }) => {
		const loginPage = new LoginPage(page)
		await loginPage.SuccessFactorsLogin()
	});

	// Acties nadat de gegevens zijn ingevoerd
	test.afterEach('test', async ({ page }) => {
		// Sluit de browser
		await page.close()
	})

	// Herhaal de stappen zo vaak als dat er records zijn in 'personsList' 
	for (let teller = 2; teller < 3; teller++) {
		let naamTeller = titelNaam(teller, personsList[teller]['naamsgegevens__voornaam'], personsList[teller]['naamsgegevens__achternaam'], personsList[teller]['functiegegevens__medewerkersgroep'])
		let zoekNaam = `${personsList[teller]['naamsgegevens__voornaam']} ${personsList[teller]['naamsgegevens__achternaam']}`
		let medewerkersgroep = `${personsList[teller]['functiegegevens__medewerkersgroep']}`

		test('toevoegen_medewerker_' + naamTeller, async ({ page }) => {
			const loginPage = new LoginPage(page)
			const basisgegevensPage = new BasisgegevensPage(page)
			const persoonlijkegegevensPage = new PersoonlijkegegevensPage(page)
			const functiegegevensPage = new FunctiegegevensPage(page)
			const doorvoerPage = new DoorvoerPage(page)

			await loginPage.gaNaarZoekTextBox(zoekNaam, medewerkersgroep.toUpperCase())
			await loginPage.searchBox(zoekNaam, medewerkersgroep.toUpperCase())

			await basisgegevensPage.Basisgegevens(
				personsList[teller]['basisgegevens__datum_in_dienst'],
				personsList[teller]['basisgegevens__bedrijf'],
				personsList[teller]['basisgegevens__gebeurtenisreden'],
				personsList[teller]['basisgegevens__sjabloon'],
				`${personsList[teller]['naamsgegevens__voornaam']} ${personsList[teller]['naamsgegevens__achternaam']}`)

			await page.waitForTimeout(1000)

			// Specifiek voor groep A
			if (medewerkersgroep.toUpperCase() == 'BEZOLDIGD PERSONEEL (A)') {
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
					personsList[teller]['telefoongegevens__is_primair'])

				await persoonlijkegegevensPage.Adresgegevens(
					personsList[teller]['adressen__straat'],
					personsList[teller]['adressen__huisnummer'],
					personsList[teller]['adressen__postcode'],
					personsList[teller]['adressen__plaats'])

				await persoonlijkegegevensPage.Doorgaan()
			}
			else { // Specifiek voor groep B
				await page.getByRole('textbox', { name: 'Initiële instroom datum (handmatig)' }).fill(datum())
				await page.getByRole('textbox', { name: 'Initiële instroom datum (handmatig)' }).press('Enter')
			}

			await functiegegevensPage.Functiegegevens(
				personsList[teller]['functiegegevens__formatieplaats'],
				personsList[teller]['functiegegevens__personeelssubgebied'],
				personsList[teller]['functiegegevens__contractsoort'],
				personsList[teller]['functiegegevens__medewerkersgroep'],
				personsList[teller]['functiegegevens__medewerkerssubgroep'],
				personsList[teller]['functiegegevens__einddatum__proeftijd'],
				personsList[teller]['functiegegevens__basis_werkuren_per_week'],
				personsList[teller]['functiegegevens__werkdagen_per_week'],
				personsList[teller]['functiegegevens__FTE'],
				personsList[teller]['functiegegevens__uitgesloten_van_automatische_verhogingen'],
				personsList[teller]['functiegegevens__standplaats'],
				personsList[teller]["functiegegevens__landstandplaats"],
				personsList[teller]["functiegegevens__einddatum__proeftijd"],
				personsList[teller]["functiegegevens__CAO__gebied"],
				personsList[teller]["functiegegevens__CAO__soort"],
				personsList[teller]["functiegegevens__CAO__schaal"],
				personsList[teller]["functiegegevens__salaristrede"],
				personsList[teller]["functiegegevens__contracttype"],
				personsList[teller]["functiegegevens__verhuisplicht"]
			)

			await functiegegevensPage.Werkrelaties(
				personsList[teller]['werkrelaties__type_relatie'],
				personsList[teller]['werkrelaties__naam']
			)

			if (medewerkersgroep.toUpperCase() == 'BEZOLDIGD PERSONEEL (A)') {
				await functiegegevensPage.Werkvergunning(
					personsList[teller]['werkvergunning__land'],
					personsList[teller]['werkvergunning__documenttype'],
					personsList[teller]['werkvergunning__documentnummer'],
					datum(1, 2, -2),
					personsList[teller]['werkvergunning__uitgevende_instantie'],
					datum(1, 2, 8)
				)
			}

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

			// await page.waitForTimeout(2000)

			// await functiegegevensPage.Doorvoeren()

			// await functiegegevensPage.Doorgaan()

			// await doorvoerPage.Reactietoevoegen(
			// 	naamTeller
			// )

			// await doorvoerPage.Doorvoeren()

			// await doorvoerPage.ControleerMelding()

		})
	}
}
catch (e) {
	console.log(e)
} 