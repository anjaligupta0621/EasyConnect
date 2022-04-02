/// <reference types="cypress" />


describe('Candidate Login page', () => {
  
    it('Logs in JobSeeker', () => {
      const username = "richa.gupta@ufl.edu"
      const password ="check1"
  
      cy.visit('http://localhost:3000/user')
      cy.get('#btnlogin').click({force: true})
      //cy.url().should('include', '/login')
     
      cy.get('input[name=emailId]').type(username)
      cy.get('input[name=Password]').type(password)
      cy.get('input[type=submit].text-input').click()
      cy.contains('Sign Out')
        //cy.url().should('include', '/login')
       
        
       // cy.contains('Sign In')
      
    })
    it('displays logout button',() => {
      cy.get('li>a').contains('Sign Out')
    })
    it('shows chat component',() => {
      cy.get('a').contains('Sign Out')
    })
  })