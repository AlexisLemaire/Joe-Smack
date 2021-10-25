/// <reference types="Cypress" />

describe("userExperience", () => { 
	it("should visit Home Page", () => {
        cy.visit("https://joe-smack-vue.herokuapp.com/");
        cy.get("main").should("have.css","background-image",'url("https://i.ibb.co/LnDRNsm/aliments.jpg")');
	});

    it("should visit list of entrees page", () => {
        cy.get("header a").eq(1).click();
        cy.reload();
        cy.get(".rc-item");
        cy.get("main").should("have.css","background-image",'url("https://i.ibb.co/SmX65RN/entree.jpg")');
    });

    it("should visit list of plats page", () => {
        cy.get("header a").eq(2).click();
        cy.get(".rc-item");
        cy.get("main").should("have.css","background-image",'url("https://i.ibb.co/nfRxZL9/plat.jpg")');
    });

    it("should visit list of patisseries page", () => {
        cy.get("header a").eq(3).click();
        cy.get(".rc-item");
        cy.get("main").should("have.css","background-image",'url("https://i.ibb.co/qW7StB9/patisserie.jpg")');
    });

    it("should visit ajout recette page", () => {
        cy.get("header a").eq(6).click();
        cy.get("form");
    });

    it('should fill ajout recette form', () => {
        cy.get("input").eq(0).type("FakeKey");
        cy.get("input").eq(1).type("FakeTitle");
        cy.get(".v-select__slot").type("plat");
        cy.get("input").eq(1).click();
        cy.get("input").eq(4).type(0);
        cy.get("input").eq(5).type(0);
        cy.get("input").eq(6).type(0);
        cy.get("input").eq(7).type("FakeIngredients");
        cy.get("form button").contains("Ajouter");
        cy.get("form button").eq(20).click();
        cy.get(".v-alert");
    });
});