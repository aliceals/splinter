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
        cy.visit('https://splinterapp.herokuapp.com')

        cy.contains('Sign Up').click()

        cy.url().should('include', '/signup')

        cy.get('.action-email')
            .type('fake@email.com')
            .should('have.value', 'fake@email.com')

    })
})