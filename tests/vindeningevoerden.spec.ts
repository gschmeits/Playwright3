import { test } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { titelNaam, datum } from "./pages/basePage";

try {
    // Haal de gegevens van de medewerkers uit het bestand
    const personsData = require("../test-data/persons.json")

    // Wijs de data toe aan variabele 'personsList' met als functiegegevens_medewerkersgroeps = "Gastvrijheid ovk (B)"
    const personsList = personsData

    test('vinden reeds ingevoerden', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.SuccessFactorsLogin()
        // Herhaal de stappen zo vaak als dat er records zijn in 'personsList'
        for (let teller = 0; teller < personsList.length; teller++) {
            let naamTeller = titelNaam(teller, personsList[teller]['naamsgegevens__voornaam'], personsList[teller]['naamsgegevens__achternaam'], personsList[teller]['functiegegevens__medewerkersgroep'])
            let zoekNaam = `${personsList[teller]['naamsgegevens__voornaam']} ${personsList[teller]['naamsgegevens__achternaam']}`
                await loginPage.gaNaarZoekTextBoxVerwijderen(zoekNaam)
                await loginPage.searchPersoon1(zoekNaam, teller+1)
        }
        await page.close()
    })
}
catch (e) {
    console.log(e)
}