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
        await loginPage.SuccessFactorsLogin("OMB")
    });

    // Acties nadat de gegevens zijn ingevoerd
    test.afterEach('test', async ({ page }) => {
        // Sluit de browser
        await page.close()
    })

    test('goedkeuren_medewerkers', async ({ page }) => {
        // Laad de gegevens van de login pagina
        const loginPage = new LoginPage(page)

        // Wacht 3 seconden
        await page.waitForTimeout(3000)

        // Zoek alle knoppen op de huidige webpagina
        const buttons = await page.locator('button').evaluateAll((elements) =>
            elements.map((element) => element.getAttribute('title'))
        );

        // Variabele om te bepalen welke knop er gedrukt dient te worden
        let teller = 0
        let aantalRijen = 0
        // Loop door alle knoppen van de pagina 
        for (let i = 0; i < buttons.length; i++) {
            // Wijs de tekst van de knop toe aan variabele tekst
            let tekst: string|null = buttons[i]
            // Indien de variabele tekst niet null is, ga dan verder
            if (tekst != null) {
                // Splits de variabele text uit per spatie
                let splitAll = tekst?.split(' ')
                // Wanneer de tekst "U", "hebt" en "taakitems." gevonden worden,
                // dan hebben we onze knop gevonden
                if ((splitAll[0]) === "U" && splitAll[1] === "hebt" && splitAll[3] === "taakitems.") {
                    // Variable teller krijgt de waarde van het nummer van de knop
                    teller = i
                    aantalRijen = Number(splitAll[2])
                    // We hebben wat we hebben willen en hoeven niet meer verder te zoeken
                    break
                }
            }
        }

        // Controleer of er bij knop teller 'U hebt 0 taakitems.' staat; zo niet ga dan verder
        if (buttons[teller] != 'U hebt 0 taakitems.') {

            // Klik op de vijfde knop om de taakitems zichbaar te maken
            await page.getByRole('button', { name: `${buttons[teller]}` }).click();
            // Wacht 2 seconden
            await page.waitForTimeout(3000)
            // Druk op 'Aanvragen goedkeuren'
            await page.getByText('Aanvragen goedkeuren').click();

            // Wacht 2 seconden
            await page.waitForTimeout(3000)

            // Wijs de tabel toe aan variabele: tabletest
            const tableTest = page.locator("table tbody");

            // Wijs alle rijen toe aan variabele: rows
            const rows = tableTest.locator("tr");

            // Herhaal de volgende staan zo vaak als dat er rijen in de tabel zijn
            for (let r = 0; r < aantalRijen; r++) {

                // Wijs 1 rij toe aan variable: row
                let row = rows.nth(r);

                // Wijs de kolommen toe aan variabele: rowData
                let rowData = row.locator("td");

                // Klik op de knop in kolom 4 (Goedkeuren)
                await rowData.nth(3).getByRole('button').click()
                await page.waitForTimeout(5000)
            }
        }
        // anders laat de melding 'U heb geen taken openstaan!!!' op de console zien
        else { console.log('Geen taken openstaan!!!') }
    })
}
catch (e) {
    console.log(e)
}