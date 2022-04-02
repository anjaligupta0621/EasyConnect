/// <reference types="cypress" />


describe('Candidate SignUp page', () => {
  
    it('SignUp in JobSeeker', () => {
      const username = "shanky11"
      const password ="check1"
      const email = "shanky11@ufl.edu"
      const contact ="9993332225"
  
      cy.visit('http://localhost:3000/user')
      cy.get('#btnlogin').click({force: true})
      //cy.url().should('include', '/login')
      const temp = cy.get('.backtoSignUp>a').click({force:true})
     // cy.get('input[name=emailId]').type(username)
      temp.get('input[name=name1]').type(username)
      temp.get('input[name=email]').type(email)
      temp.get('input[name=contact]').type(contact)
      temp.get('input[name=password]').type(password)
      temp.get('input[name=passwordcheck]').type(password)
      temp.get('.submit-button').click()

      
    })
    it('displays logout button',() => {
       cy.get('li>a').contains('Sign Out')
    })
    // it('shows chat component',() => {
    //   cy.get('a').contains('Sign Out')
    // })
  })