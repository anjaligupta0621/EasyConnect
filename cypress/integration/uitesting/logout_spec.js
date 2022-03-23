/// <reference types="cypress" />


describe('Login page', () => {
  
    it('Logs in user', () => {
      const username = "anjaligupta@ufl.edu"
      const password ="check123"
  
      cy.visit('http://localhost:3000/')
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
    
    it('Post Job',() => {
        cy.get('li').contains('Post Job Description').click({force:true})
    })

  })