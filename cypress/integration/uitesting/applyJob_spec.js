describe('Apply Jobs Module', () => {
  
    it('Logs in JobSeeker', () => {
      const username = "richa.gupta@ufl.edu"
      const password ="check1"
  
      cy.visit('http://localhost:3000/')

      cy.get('.viewas').click().get('.dropdown>.dropdown-menu>a').click();
   
    })

})