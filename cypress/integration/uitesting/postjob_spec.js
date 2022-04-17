/// <reference types="cypress" />

describe("PostJob page", () => {
  const username = "sola@sola.com";
  const password = "123456";
  const orgName = "Google.com";
  const website = "http://www.google.com";
  const description =
    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..";
  const roleName = "SDE II";
  const responsibilities =
    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..";
  const salaryFrom = 30000;
  const salaryTo = 70000;

  it("Checks Logs in user", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#btnlogin").click({ force: true });
    cy.get("input[name=emailId]").type(username);
    cy.get("input[name=Password]").type(password);
    cy.get("input[type=submit].text-input").click();
    cy.contains("Sign Out");
    cy.contains("Post Job Description").click({ force: true });
    cy.get(".postJob-anchor").click();
    // cy.contains("Post Job").click({ force: true });
    cy.url().should("include", "/postJob");
    cy.get("input[name=organization_name]").type(orgName);
    cy.get("input[name=organization_website]").type(website);
    cy.get("[name=orgDescription]").type(description);
    cy.contains("Next").click({ force: true });
    cy.get("input[name=role_name]").type(roleName);
    cy.get("input[name=question]").first().check();
    cy.get("input[name=jobtype]").last().check();
    cy.get("input[name=date]").last().check();
    cy.get('[name="responsibilities"]').type(responsibilities);
    cy.get('[name="salaryFrom"]').first().type(salaryFrom);
    cy.get('[name="salaryTo"]').first().type(salaryTo);
    cy.get(".post-button").click();
    cy.contains("Dashboard");
    cy.url().should("include", "/jobDashBoard");
    cy.contains("Sign Out");
  });
  it("Displays logout button", () => {
    cy.contains("Sign Out");
  });

  it("Show Jobs", () => {
    cy.get("td").contains("SDE II");
    cy.get("th").contains("Posting Date");
  });

  it("Signing Out", () => {
    cy.contains("Sign Out").click({ force: true });
  });
});
