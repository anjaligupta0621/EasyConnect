/// <reference types="cypress" />


describe('PostJob page', () => {
  
    it('Checks Logs in  user', () => {
        const username = "anjaligupta@ufl.edu"
        const password ="check123"
    
        cy.visit('http://localhost:3000/')
        cy.contains('Post Job').click({force: true})
        //cy.url().should('include', '/login')     
        cy.get('input[name=emailId]').type(username)
        cy.get('input[name=Password]').type(password)
        cy.get('input[type=submit].text-input').click()
        cy.contains('Sign Out')
          //cy.url().should('include', '/login')
         
          
         // cy.contains('Sign In')
        
      })
  
      it('Displays logout button',() => {
        cy.get('li>a').contains('Sign Out')
      })
  
      it('Shows chat component',() => {
        cy.get('a').contains('Sign Out')
      })
      
      it('Show Jobs',() => {
          cy.get('li').contains('Post Job Description').click({force:true})

          cy.get('h1>a').contains('Post Job').click({force:true})

      })
  })