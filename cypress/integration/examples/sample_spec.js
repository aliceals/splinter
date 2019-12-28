describe('My First Test', function () {
    it('Test that it works', function () {
        expect(true).to.equal(true)
    })
})

describe('My First Test', function () {
    it('Visits the page', function () {
        cy.visit('https://splinterapp.herokuapp.com')
    })
})