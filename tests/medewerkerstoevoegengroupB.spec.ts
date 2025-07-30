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

	// Wijs de data toe aan variabele 'personsList' met als functiegegevens_medewerkersgroeps = "Gastvrijheid ovk (B)"
	const personsList = personsData.filter((item: { functiegegevens__medewerkersgroep: string; }) => item.functiegegevens__medewerkersgroep === "Gastvrijheid ovk (B)");

	// Datum van vandaag
	const today = new Date()
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();
	var todayDate = dd + mm + yyyy;

	// Einddatum contract
	const date = new Date()
	var dd = String(date.getDate()).padStart(2, '0');
	var mm = String(date.getMonth() + 1).padStart(2, '0');
	var yyyy = date.getFullYear() + 1;
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

	// Herhaal de stappen zo vaak als dat er records zijn in 'personsList' met medewerkersgroep 'Gastvrijheid ovk (B)'
	for (let teller = 0; teller < personsList.length; teller++) {
		let naam = titelNaam(teller, personsList[teller]['naamsgegevens__voornaam'], personsList[teller]['naamsgegevens__achternaam'], personsList[teller]['functiegegevens__medewerkersgroep'])
		test('toevoegen_medewerker_' + naam, async ({ page }) => {
			const basisgegevensPage = new BasisgegevensPage(page)

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

			// Matches negeren


			
			await page.waitForTimeout(5000)

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
catch (e) {
	console.log(e)
} 