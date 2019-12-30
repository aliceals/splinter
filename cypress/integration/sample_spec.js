describe('My First Test', function () {
    it('Test that it works', function () {
        expect(true).to.equal(true)
    })
})

it('A user can visit the page', function () {
    cy.visit('http://localhost:3000/')

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

    cy.get('.email').type(userID_Alpha_Numeric())

    function userID_Alpha_Numeric() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    // cy.get('.email')
    //     .type('fake225@email.com')
    //     .should('have.value', 'fake225@email.com')

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


function logUserIn() {
    cy.visit('http://localhost:3000/')

    cy.contains('Log In').click()

    cy.get('.useremail')
        .type('fake225@email.com')
        .should('have.value', 'fake225@email.com')

    cy.get('.password')
        .type('banana')
        .should('have.value', 'banana')

    cy.contains('Log In!').click()

    cy.contains('Logout')
    cy.contains('Create a new group')
}

it('A user can create a new group', function () {
    logUserIn()

    cy.get('.groupname')
        .type('test group')
        .should('have.value', 'test group')

    cy.get('.groupdescription')
        .type('banana')
        .should('have.value', 'banana')

    cy.get('.groupmember')
        .type('banana')
        .should('have.value', 'banana')

    cy.contains('Add member').click()

    cy.get('.groupmember')
        .type('pickle')
        .should('have.value', 'pickle')

    cy.contains('Add member').click()

    cy.contains('Create Group').click()

    cy.contains('Add New Transaction')
})

it('A user can create a transaction from already created group', function () {
    logUserIn()

    cy.contains('test group').click()

    cy.contains('Add New Transaction').click()

    cy.get('.paymentDesc')
        .type('test one')
        .should('have.value', 'test one')

    cy.get('.payedby')
        .select('banana')
        .should('have.value', '42')

    cy.get('.amount')
        .type('200')
        .should('have.value', '200')

    cy.contains('Add Transaction').click()
})