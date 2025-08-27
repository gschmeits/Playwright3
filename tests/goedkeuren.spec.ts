import { expect, test } from '@playwright/test';
import { LoginPage } from './pages/loginPage';

try {
    // Haal de gegevens van de medewerkers uit het bestand
    const personsData = require("../test-data/persons.json")

    // Wijs de data toe aan variabele 'personsList' met als functiegegevens_medewerkersgroeps = "Gastvrijheid ovk (B)"
    const personsList = personsData

    // Acties voordat de gegevens toegevoegd worden
    test.beforeEach('test', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.SuccessFactorsLogin("HRA")
    });

    // Acties nadat de gegevens zijn ingevoerd
    test.afterEach('test', async ({ page }) => {
        // Sluit de browser
        await page.close()
    })

    test('goedkeuren_medewerkers', async ({ page }) => {
        // Laad de gegevens van de login pagina
        const loginPage = new LoginPage(page)

        // Wacht 2 seconden
        await page.waitForTimeout(2000)

        // Zoek alle knoppen op de huidige webpagina
        const buttons = await page.locator('button').evaluateAll((elements) =>
            elements.map((element) => element.getAttribute('title'))
        );

        // Controleer of er bij knop 5 'U hebt o taakitems.' staat; zo niet ga dan verder
        if (buttons[4] != 'U hebt 0 taakitems.') {

            // Klik op de vijfde knop om de taakitems zichbaar te maken
            await page.getByRole('button', { name: `${buttons[4]}` }).click();

            // Druk op 'Aanvragen goedkeuren'
            await page.getByText('Aanvragen goedkeuren').click();

            // Wacht 2 seconden
            await page.waitForTimeout(2000)

            // Wijs de tabel toe aan variabele: tabletest
            const tableTest = page.locator("table tbody");

            // Wijs alle rijen toe aan variabele: rows
            const rows = tableTest.locator("tr");

            // Herhaal de volgende staan zo vaak als dat er rijen in de tabel zijn
            for (let r = 0; r < await rows.count(); r++) {

                // Wijs 1 rij toe aan variable: row
                let row = rows.nth(r);

                // Wijs de kolommen toe aan variabele: rowData
                let rowData = row.locator("td");

                // Klik op de knop in kolom 4 (Goedkeuren)
                await rowData.nth(3).getByRole('button').click()
            }
        }
        // anders laat de melding 'U heb geen taken openstaan!!!' op de console zien
        else { console.log('Geen taken openstaan!!!') }
    })
}
catch (e) {
    console.log(e)
}