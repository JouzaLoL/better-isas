/// <reference types="Cypress" />
/* Load in username and password from local env file */
require("dotenv").load({ path: "../../.env" });

describe("Index page", () => {
    before(() => {
        cy.visit("/");
    });

    it("should display login form", () => {
        cy.get("form[action='/stats']").should("exist");
    });

    it("should log in", () => {
        cy.get("form[action='/stats'] #usr").type(process.env["ISAS_USERNAME"]);
        cy.get("form[action='/stats'] #pwd").type(process.env["ISAS_PASSWORD"]);
        cy.get("form[action='/stats'] button[type='submit']").click();
        cy.location().should("include", "/stats");
    });
});