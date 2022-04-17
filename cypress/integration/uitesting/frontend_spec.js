/// <reference types="cypress" />

import { first } from "lodash";

// const { default: cy } = require("date-fns/esm/locale/cy/index.js");
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
describe("Easy Connect", () => {
  // #1 Test case for visiting Homepage!
  it("Visit Home Page", () => {
    cy.visit("http://localhost:3000");

    cy.get(".navbar-right")
      .find("input")
      .should("have.class", "sign-in-bt-top");

    cy.get(".home-cards")
      .find("h2")
      .contains("Access a large pool of freshers");
    cy.get(".home-cards")
      .find("h2")
      .contains("Applicants are automatically sorted");
    cy.get(".home-cards")
      .find("h2")
      .contains("View rich profiles of top ranked candidates");
    cy.get(".home-cards")
      .find("h2")
      .contains("Hire freshers without leaving your office");
  });
  //   #2 Test case for Recruiter Registration!
  it("Recruiter Opens Registration Model", () => {
    cy.get(".navbar-right")
      .find("input")
      .should("have.class", "sign-in-bt-top")
      .click();

    cy.get(".modal-body").find("h1").contains("Recruiter Login");
    cy.get(".modal-body").find(".signup-bottom").contains("Sign Up").click();
    cy.get(".tab-content")
      .find("h3")
      .contains("Please provide your Login Details");
  });
  //   #3 Test case Recruiter Registration!
  it("Recruiter Registration", () => {
    const nameOfCompany = "Alphabet INC.";
    const recruiterName = "Josh Dallas";
    const corporateWebsite = "Google.com";
    const corporateEmail = makeid(15) + "@easy-connect.com";
    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    const contactNumber = id;
    const password = "888888888";
    const passwordcheck = "888888888";

    cy.visit("http://localhost:3000");
    cy.get(".navbar-right")
      .find("input")
      .should("have.class", "sign-in-bt-top")
      .click();
    cy.get(".modal-body").find("h1").contains("Recruiter Login");
    cy.get(".modal-body").find(".signup-bottom").contains("Sign Up").click();
    cy.get(".tab-content")
      .find("h3")
      .contains("Please provide your Login Details");
    cy.get(".tab-content")
      .find("h3")
      .contains("Please provide your Login Details");
    cy.get(".wizard").find("[name='company-name']").type(nameOfCompany);
    cy.get(".wizard").find("[name='recruiter-name']").type(recruiterName);
    cy.get(".wizard").find("[name='corporate-website']").type(corporateWebsite);
    cy.get(".wizard").find("[name='corporate-email']").type(corporateEmail);
    cy.get(".wizard").find("[name='contact-number']").type(contactNumber);
    cy.get(".wizard").find("[name='signup-password']").type(password);
    cy.get(".wizard").find("[name='password-repeat']").type(passwordcheck);
    cy.get(".wizard").find("[name='signup-submit']").click();
    cy.get(".navbar-right").find(".signout-button").click();
    cy.get(".navbar-right")
      .find(".sign-in-bt-top")
      .should("have.value", "Sign In");
  });
  //   #4 Test case Recruiter Logs In
  it("Recruiter Logs In", () => {
    const username = "josh.dallas@google.com";
    const password = "888888888";
    cy.visit("http://localhost:3000");
    cy.get(".navbar-right")
      .find("input")
      .should("have.class", "sign-in-bt-top")
      .click();
    cy.get(".modal-body").find("h1").contains("Recruiter Login");
    cy.get("input[name=emailId]").type(username);
    cy.get("input[name=login-password]").type(password);
    cy.get("input[name=login-submit]").click();
    cy.get(".navbar-right").find(".signout-button").contains("Sign Out");
  });

  //   #5 Test case Recruiter Logs Out!
  it("Recruiter Logs Out", () => {
    const username = "josh.dallas@google.com";
    const password = "888888888";
    cy.visit("http://localhost:3000");
    cy.get(".navbar-right")
      .find("input")
      .should("have.class", "sign-in-bt-top")
      .click();
    cy.get(".modal-body").find("h1").contains("Recruiter Login");
    cy.get("input[name=emailId]").type(username);
    cy.get("input[name=login-password]").type(password);
    cy.get("input[name=login-submit]").click();
    cy.get(".navbar-right").find(".signout-button").contains("Sign Out");

    cy.get(".home-cards")
      .find("h2")
      .contains("Access a large pool of freshers");

    cy.get(".navbar-right")
      .find(".signout-button")
      .contains("Sign Out")
      .click();

    cy.get(".navbar-right")
      .find(".sign-in-bt-top")
      .should("have.value", "Sign In");
  });
  // #6  Test case Recruiter resturns to Home after Signout!
  it("Displays Sign In button", () => {
    cy.visit("http://localhost:3000/");

    cy.get(".navbar-right")
      .find(".sign-in-bt-top")
      .should("have.value", "Sign In");
  });
  //   #7 test case Recruiter goes to post job page!
  it("Recruiter Goes to Post a Job Page", () => {
    const username = "sola@sola.com";
    const password = "123456";

    cy.visit("http://localhost:3000/");
    cy.get(".navbar-right")
      .find("input")
      .should("have.class", "sign-in-bt-top")
      .click();
    cy.get(".modal-body").find("h1").contains("Recruiter Login");
    cy.get("input[name=emailId]").type(username);
    cy.get("input[name=login-password]").type(password);
    cy.get("input[name=login-submit]").click();
    cy.get(".navbar-right").find(".signout-button").contains("Sign Out");
    cy.get(".post-job-anchor").click();
    cy.url().should("include", "/jobDashBoard");
    cy.get(".main-wrapper").find("h1").contains("Dashboard");
    cy.get(".navbar-right")
      .find(".signout-button")
      .contains("Sign Out")
      .click();
  });
  //   #8 Test Case Recruiter Posts a Job!
  it("Post a Job", () => {
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
    cy.visit("http://localhost:3000/");
    cy.get("#btnlogin").click({ force: true });
    cy.get("input[name=emailId]").type(username);
    cy.get("input[name=login-password]").type(password);
    cy.get("input[type=submit].text-input").click();
    cy.get(".post-job-anchor").click();
    cy.get(".main-wrapper").find("h1").contains("Dashboard");
    cy.url().should("include", "/jobDashBoard");

    cy.get(".postJob-anchor").click();
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
    cy.url().should("include", "/jobDashBoard");
    cy.get(".main-wrapper").find("h1").contains("Dashboard");
    cy.get(".navbar-right").find(".signout-button").contains("Sign Out");
  });
  //  #9 Test for Shows Job After Posting!
  it("Show Jobs", () => {
    cy.get("td").contains("SDE II");
    cy.get("th").contains("Posting Date");
  });
  //   #10 Test case Recruiter goes to shortlist page!
  it("Recruiter Goes to Shortlist Job Page", () => {
    const username = "sola@sola.com";
    const password = "123456";

    cy.visit("http://localhost:3000/");
    cy.get(".navbar-right")
      .find("input")
      .should("have.class", "sign-in-bt-top")
      .click();
    cy.get(".modal-body").find("h1").contains("Recruiter Login");
    cy.get("input[name=emailId]").type(username);
    cy.get("input[name=login-password]").type(password);
    cy.get("input[name=login-submit]").click();
    cy.get(".navbar-right").find(".signout-button").contains("Sign Out");
    cy.get(".shortlist-anchor").click();
    cy.url().should("include", "/shortListCandidate");
    cy.get(".main-wrapper").find("h1").contains("Shortlist Candidates");
  });
  //   #11 Test case Recruiter Logs Out After Visit!
  it("Recruiter Logs Out After Shortlist Page", () => {
    cy.get(".main-wrapper").find("h1").contains("Shortlist Candidates");

    cy.get(".navbar-right")
      .find(".signout-button")
      .contains("Sign Out")
      .click();

    cy.get(".navbar-right")
      .find(".sign-in-bt-top")
      .should("have.value", "Sign In");
  });
  //   Candidate Section Test Cases
  //   #12 Test for Candidate Registers for Jobs!
  it("Candidate Registers for Jobs", () => {
    const username = makeid(15);
    const password = "check1";
    const email = username + "@easy-connect.com";
    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    const contact = id;

    cy.visit("http://localhost:3000/user");
    cy.get("#btnlogin").click({ force: true });
    //cy.url().should('include', '/login')
    cy.get(".backtoSignUp>a").click({ force: true });
    // cy.get('input[name=emailId]').type(username)
    cy.get("input[name=name1]").type(username);
    cy.get("input[name=email]").type(email);
    cy.get("input[name=contact]").type(contact);
    cy.get("input[name=password]").type(password);
    cy.get("input[name=passwordcheck]").type(password);
    cy.get(".submit-button").click();
    cy.contains("Sign Out");
  });
  //   #13 Test for Candidate Session In for Jobs!
  it("Candidate In Session", () => {
    const username = "shanky11@ufl.edu";
    const password = "check1";

    cy.visit("http://localhost:3000/");
    cy.get(".viewas").click().get(".dropdown>.dropdown-menu>a").click();
    cy.contains("CHOOSE YOUR DREAM COMPANY");

    cy.get("#btnlogin").click({ force: true });
    cy.get("input[name=emailId]").type(username);
    cy.get("input[name=Password]").type(password);
    cy.get("input[type=submit].text-input").click();

    cy.contains("Sign Out");
  });
  //   #14 Candidate Logs Out!
  it("Candidate Successfully Logged Out", () => {
    const username = "shanky11@ufl.edu";
    const password = "check1";

    cy.visit("http://localhost:3000/");
    cy.get(".viewas").click().get(".dropdown>.dropdown-menu>a").click();
    cy.contains("CHOOSE YOUR DREAM COMPANY");

    cy.get("#btnlogin").click({ force: true });
    cy.get("input[name=emailId]").type(username);
    cy.get("input[name=Password]").type(password);
    cy.get("input[type=submit].text-input").click();

    cy.contains("Sign Out").click();
  });
  //   #15 Candidate Logs In!

  it("Candidate Logs in JobSeeker", () => {
    const username = "shanky11@ufl.edu";
    const password = "check1";

    cy.visit("http://localhost:3000/");
    cy.get(".viewas").click().get(".dropdown>.dropdown-menu>a").click();
    cy.contains("CHOOSE YOUR DREAM COMPANY");

    cy.get("#btnlogin").click({ force: true });
    cy.get("input[name=emailId]").type(username);
    cy.get("input[name=Password]").type(password);
    cy.get("input[type=submit].text-input").click();

    cy.contains("Sign Out");
  });

  //   #16 Candidate Logs Out!
  it("Candidate Logs Out", () => {
    cy.contains("Sign Out").click();
  });
  //   #17 Candidate Logs In!

  it("Candidate Logs in JobSeeker", () => {
    const username = "shanky11@ufl.edu";
    const password = "check1";

    cy.visit("http://localhost:3000/user");
    cy.contains("CHOOSE YOUR DREAM COMPANY");

    cy.get("#btnlogin").click({ force: true });
    cy.get("input[name=emailId]").type(username);
    cy.get("input[name=Password]").type(password);
    cy.get("input[type=submit].text-input").click();

    cy.contains("Sign Out");
  });
  //   #18 Candidate Is at Jobs Dashboard!
  it("Candidate Is at Jobseeker Dashboard", () => {
    cy.contains("CHOOSE YOUR DREAM COMPANY");
    cy.get(".jobs").find("a").contains("SDE II");
    cy.get(".jobs").find("button").should("have.class", "btn-primary");
    cy.get(".jobs")
      .find("button")
      .should("have.class", "btn-primary")
      .first()
      .contains("Easy Apply");
    cy.contains("Sign Out");
  });
  //   #19 Candidate at Dashboard for a job!
  it("Candidate applies for a job", () => {
    cy.contains("CHOOSE YOUR DREAM COMPANY");
    cy.get(".jobs").find("a").contains("SDE II");
    cy.get(".jobs").find("button").should("have.class", "btn-primary");
    cy.get(".jobs")
      .find("button")
      .should("have.class", "btn-primary")
      .first()
      .click()
      .contains("Applied");
    // cy.contains("Sign Out").click();
  });
  //   #20 Candidate Is at Jobs Dashboard
  it("Candidate logs out", () => {
    cy.contains("CHOOSE YOUR DREAM COMPANY");
    cy.get(".jobs").find("a").contains("SDE II");
    cy.get(".jobs").find("button").should("have.class", "btn-primary");
    cy.get(".jobs")
      .find("button")
      .should("have.class", "btn-primary")
      .first()
      .contains("Applied");
    cy.contains("Sign Out").click();
  });
});
