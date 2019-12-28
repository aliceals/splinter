describe('My First Test', function () {
    it('Test that it works', function () {
        expect(true).to.equal(true)
    })
})

describe('User can sign in', function () {
    it('Visits the page', function () {
        cy.visit('https://splinterapp.herokuapp.com')

        cy.contains('Sign')
    })
    it('Clicks the sign in link', function () {
        cy.visit('http://localhost:3000/#/')

        cy.contains('Sign Up').click()

        cy.url().should('include', '/signup')

        cy.get('.action-first')
            .type('fake')
            .should('have.value', 'fake')

        cy.get('.action-last')
            .type('last')
            .should('have.value', 'last')

        cy.get('.action-email')
            .type('fake2@email.com')
            .should('have.value', 'fake2@email.com')

        cy.get('.action-password1')
            .type('banana')
            .should('have.value', 'banana')

        cy.get('.action-password2')
            .type('banana')
            .should('have.value', 'banana')

        cy.contains('Sign up!').click()
    })
})