/// <reference types="Cypress" />

describe("Index page", () => {
    before(() => {
        cy.visit("/");
    });

    it("should display login form", () => {
        cy.get("form[action='/stats']").should("exist");
    });

    it("should log in", () => {
        cy.get("#usr").type(Cypress.env("ISAS_USERNAME"));
        cy.get("#pwd").type(Cypress.env("ISAS_PASSWORD"));
        cy.get("button[type='submit']").click();
        cy.location().should("include", "/stats");
    });
});