import { Page } from "@playwright/test";
import BasePage from "./basePage";
import { Base64 } from "base64-string";
require("dotenv").config();

export class LoginPage extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	async SuccessFactorsLogin(user: string = "PA") {
		const enc = new Base64();
		// -------------------------------------------------
		// Inloggen en optie nieuwe medewerker zoeken
		// -------------------------------------------------
		// Ga naar url
		await this.page.goto(process.env.URL!);
		let username = ""
		if (user === "PA") {
			username = process.env.USERNAME_PA!
		}
		if (user === "HRA") {
			username = process.env.USERNAME_HRA!
		}
		if (user === "OMB") {
			username = process.env.USERNAME_OMB!
		}

		// Vul de gebruikersnaam in
		await this.page
			.getByRole("textbox", { name: "User Account" })
			.fill(username);
		await this.page.getByRole("textbox", { name: "Password" }).click();

		let password = enc.decode(process.env.PASSWORD_PA!);
		// Vul het wachtwoord in
		await this.page.getByRole("textbox", { name: "Password" }).fill(password);
		await this.page.getByRole("textbox", { name: "Password" }).press("Enter");
	}


}
