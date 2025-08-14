import { Page, expect } from "@playwright/test";
import BasePage from "./basePage";
require("dotenv").config();

export class DoorvoerPage extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	async Reactietoevoegen(
		naam: string,
		wachttijd: number = 1000
	) {
		// Vul een reactie in
		await this.page.getByRole('textbox', { name: 'Voer hier uw reactie in' }).fill('Reactie: test automatisering: ' + naam);
	}

	async ControleerMelding() {
		// Controleer of de melding verschijnt dat er een workflow is aangemaatk
		await expect(this.page.getByText('Voor deze actie is een')).toBeVisible();
		await expect(this.page.locator('[id="__title58-inner"]')).toContainText('Voor deze actie is een workflow gemaakt.');
	}
}
