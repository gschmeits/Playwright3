import { expect, test } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { BasisgegevensPage } from './pages/basisgegevensPage';
import { titelNaam, datum, eindDatum } from "./pages/basePage";
import { PersoonlijkegegevensPage } from './pages/persoonlijkegegevensPage';
import { FunctiegegevensPage } from './pages/functiegegevensPage';
import { DoorvoerPage } from './pages/doorvoerPage';

try {
	// Haal de gegevens van de medewerkers uit het bestand
	const personsData = require("../test-data/persons.json")

	// Wijs de data toe aan variabele 'personsList' met als functiegegevens_medewerkersgroeps = "Gastvrijheid ovk (B)"
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
	for (let teller = 18; teller < 19; teller++) {
		let naamTeller = titelNaam(teller, personsList[teller]['naamsgegevens__voornaam'], personsList[teller]['naamsgegevens__achternaam'], personsList[teller]['functiegegevens__medewerkersgroep'])
		let zoekNaam = `${personsList[teller]['naamsgegevens__voornaam']} ${personsList[teller]['naamsgegevens__achternaam']}`

		test('verwijderen_medewerker_' + naamTeller, async ({ page }) => {
			const loginPage = new LoginPage(page)

			await loginPage.gaNaarZoekTextBoxVerwijderen(zoekNaam)
			await page.locator('b').last().click()

			if (await page.locator('#search').getByText('Er zijn geen resultaten').isVisible() == false) {
				console.log("De geselecteerde medewerker is gevonden.")
				await page.waitForTimeout(2000)
				await loginPage.actie("Beëindigen")
				await page.waitForTimeout(5000)
				if (await page.getByText('Er bestaat al een aanvraag').isVisible() === false) {
					loginPage.fillTextBox('Laatste dag indienst', eindDatum())
					loginPage.fillTextBox('Laatste werkdag', eindDatum())
					await page.waitForTimeout(3000)
					loginPage.comboboxSelectie('Reden beëindiging', 'Uitdienst Einde Tijdelijk Dienst (0913)')
					await page.waitForTimeout(3000)
					loginPage.clickButton('Opslaan')
					await page.waitForTimeout(5000)
					loginPage.fillTextBox('Voer hier u reactie in', 'Helaas kan deze tijdelijke dienst niet gecontinueerd worden.')
					await page.waitForTimeout(3000)
					loginPage.clickButton('Doorvoeren')
				}
				else {
					console.log(`Er bestaat al een aanvraag voor een uitdiensttredingsworkflow voor gebruiker ${zoekNaam}.`)
					await loginPage.clickButton('Sluiten')
				}
			}
			else {
				console.log("De gezochte medewerker is NIET gevonden!!!")
			}
		})
	}
}
catch (e) {
	console.log(e)
}