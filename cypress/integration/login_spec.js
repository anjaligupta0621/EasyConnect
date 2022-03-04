/// <reference types="cypress" />


describe('Login page', () => {
  
  it('Logs in user', () => {
    const username = "dummy@gmail.com"
    const password ="dummy"

    cy.visit('http://localhost:3000/')
    cy.get('#btnlogin').click({force: true})
    //cy.url().should('include', '/login')
   
    cy.get('input[name=emailId]').type(username)
    cy.get('input[name=Password]').type(password)
    cy.get('input[type=submit]').click()
    cy.contains('Logout')
    
  })
  it('displays logout button',() => {
    cy.get('[data-cy=logoutbtn]').contains('Logout')
  })
  it('shows chat component',() => {
    cy.get('div').contains('Chat')
    
  })
})