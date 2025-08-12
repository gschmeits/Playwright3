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

	// Wijs de data toe aan variabele 'personsList' met als functiegegevens_medewerkersgroeps = "Extern bedrijf (E)"
	const personsList = personsData.filter((item: { functiegegevens__medewerkersgroep: string; }) => item.functiegegevens__medewerkersgroep === "Extern bedrijf (E)");

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

	// Herhaal de stappen zo vaak als dat er records zijn in 'personsList' met medewerkersgroep 'Extern bedrijf (E)'
	for (let teller = 0; teller < personsList.length; teller++) {
		let naam = titelNaam(teller, personsList[teller]['naamsgegevens__voornaam'], personsList[teller]['naamsgegevens__achternaam'], personsList[teller]['functiegegevens__medewerkersgroep'])
		test('toevoegen_medewerker_' + naam, async ({ page }) => {
			const basisgegevensPage = new BasisgegevensPage(page)
			const loginPage = new LoginPage(page)
		
			await loginPage.gaNaarZoekTextBox(`${personsList[teller]['naamsgegevens__voornaam']} ${personsList[teller]['naamsgegevens__achternaam']}`)
			
			await basisgegevensPage.Basisgegevens(
				personsList[teller]['basisgegevens__datum_in_dienst'],
				personsList[teller]['basisgegevens__bedrijf'],
				personsList[teller]['basisgegevens__gebeurtenisreden'],
				personsList[teller]['basisgegevens__sjabloon'],
				`${personsList[teller]['naamsgegevens__voornaam']} ${personsList[teller]['naamsgegevens__achternaam']}`)


			await page.waitForTimeout(500)


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