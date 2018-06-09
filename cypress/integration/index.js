/// <reference types="Cypress" />

describe("Index page", () => {
    before(() => {
        cy.visit("/");
        cy.clearCookies();
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce("auth", "lastMark");
    });

    it("should display login form", () => {
        cy.get("form[action='/stats']").should("exist");
    });

    it("should log in", () => {
        cy.get("#usr").type(Cypress.env("ISAS_USERNAME"));
        cy.get("#pwd").type(Cypress.env("ISAS_PASSWORD"));
        cy.get("button[type='submit']").click();
        cy.location().then((loc) => {
            expect(loc.pathname).to.equal("/stats");
        });
    });

    it("should display NEW on unseen marks", () => {
        cy.get(".newMarkDot").should("exist");
    });

    it("should not display NEW on already seen marks", () => {
        cy.reload();
        cy.get(".newMarkDot").should("not.exist");
    });

    it("should log out", () => {
        cy.get("a[href='/logout']").click();
        cy.getCookie("auth").should("not.exist");
    });

    it("should display error on failed login", () => {
        cy.get("#usr").type("something");
        cy.get("#pwd").type("something");
        cy.get("button[type='submit']").click();
        cy.get("div.alert").should("exist");
    });
});