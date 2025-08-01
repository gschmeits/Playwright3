import { test } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { BasisgegevensPage } from './pages/basisgegevensPage';
import { titelNaam } from "./pages/basePage";
import { PersoonlijkegegevensPage } from './pages/persoonlijkegegevensPage';
import { FunctiegegevensPage } from './pages/functiegegevensPage';
import { DoorvoerPage } from './pages/doorvoerPage';

try {
	// Haal de gegevens van de medewerkers uit het bestand
	const personsData = require("../test-data/persons.json")

	// Wijs de data toe aan variabele 'personsList' met als functiegegevens_medewerkersgroeps = "Bezoldigd personeel (A)"
	const personsList = personsData.filter((item: { functiegegevens__medewerkersgroep: string; }) => item.functiegegevens__medewerkersgroep === "Bezoldigd personeel (A)");

	// Datum van vandaag
	const today = new Date()
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');	// Maandtelling begint bij 0, voor de huidige maand 
															// dienen we dus 1 op te tellen,
															// anders krijgen we de afgelopen maand
	var yyyy = today.getFullYear();
	var todayDate = dd + mm + yyyy;

	// Einddatum contract
	const date = new Date()
	var dd = String(date.getDate()).padStart(2, '0');
	var mm = String(date.getMonth() + 1).padStart(2, '0');
	var yyyy = date.getFullYear() + 1;						// Een jaar na de huidige datum
	var newDate = dd + mm + yyyy;

	// Uitgiftedatum identiteitsbewijs
	var dd = String(today.getDate() + 1).padStart(2, '0');
	var mm = String(today.getMonth() + 3).padStart(2, '0');
	var yyyy = today.getFullYear() - 2;
	var uitgiftedatum = dd + mm + yyyy;

	// Vervaldatum identiteitsbewijs
	var dd = String(today.getDate() + 1).padStart(2, '0');
	var mm = String(today.getMonth() + 3).padStart(2, '0');
	var yyyy = today.getFullYear() + 8;
	var vervaldatum = dd + mm + yyyy;

	// Acties voordat de gegevens toegevoegd worden
	test.beforeEach('test', async ({ page }) => {
		const loginPage = new LoginPage(page)
		await loginPage.SuccessFactorsLogin()
		await loginPage.gaNaarZoekTextBox()
	});

	// Acties nadat de gegevens zijn ingevoerd
	test.afterEach('test', async ({ page }) => {
		// Sluit de browser
		await page.close()
	})

	// Herhaal de stappen zo vaak als dat er records zijn in 'personsList'
	for (let teller = 0; teller < personsList.length; teller++) {
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
					personsList[teller]['basisgegevens__sjabloon'])

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

				// Ga gewoon verder wanneer de medewerkersgroep 'Bezoldigd Personeel (A)' is
				if (personsList[teller]["functiegegevens__medewerkersgroep"] === "Bezoldigd personeel (A)") {
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
						newDate,
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
						uitgiftedatum,
						personsList[teller]['werkvergunning__uitgevende_instantie'],
						vervaldatum
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
				}
			})
		}
	}
}
catch (e) {
	console.log(e)
} 