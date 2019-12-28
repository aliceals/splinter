describe('My First Test', function () {
    it('Test that it works', function () {
        expect(true).to.equal(true)
    })
})

it('A user can visit the page', function () {
    cy.visit('https://splinterapp.herokuapp.com')

    cy.contains('Sign')
})

it('A user can register', function () {
    cy.visit('http://localhost:3000/')

    cy.contains('Sign Up').click()

    cy.get('.first')
        .type('fake')
        .should('have.value', 'fake')

    cy.get('.last')
        .type('last')
        .should('have.value', 'last')

    cy.get('.email')
        .type('fake225@email.com')
        .should('have.value', 'fake225@email.com')

    cy.get('.password1')
        .type('banana')
        .should('have.value', 'banana')

    cy.get('.password2')
        .type('banana')
        .should('have.value', 'banana')

    cy.contains('Sign up!').click()

    cy.contains('Logout')
    cy.contains('Create a new group')

})