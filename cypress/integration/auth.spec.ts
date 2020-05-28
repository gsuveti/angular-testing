/// <reference types="cypress" />

context('Auth', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200');
    });


    it('Login link should be present', () => {
        cy.get('#login').should('contain', 'Login');
        // TODO fix me
        // cy.get('p').should('contain', 'Hello there george.bluth@reqres.in!');
    });

});
