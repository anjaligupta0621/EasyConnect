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
    const uuid = () => Cypress._.random(0, 1e10);
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
    const username = "shanky11@ufl.edu";
    const password = "check1";
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
    const username = "shanky11@ufl.edu";
    const password = "check1";
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
    const username = "shanky11@ufl.edu";
    const password = "check1";

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
  it("Recruiter Posts a Job", () => {
    const username = "shanky11@ufl.edu";
    const password = "check1";
    const orgName = "Google.com";
    const website = "http://www.google.com";
    const description =
      "Lorem ipsum dolor";
    const roleName = "SDE II";
    const responsibilities =
      "Lorem ipsum dolor";
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
    const username = "shanky11@ufl.edu";
    const password = "check1";

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
    const username = makeid(8);
    const password = "check1";
    const email = username + "@easy-connect.com";
    const uuid = () => Cypress._.random(0, 1e10);
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
    // cy.contains("Sign Out");
  });
  //   #13 Test Case Candidate Profile Update!
  it("Candidate Updates profile details", () => {
    const firstname = "Gaurav";
    const lastname = "Pathak";
    const email = "shanky11@ufl.edu";
    const phone = 1;
    const website = "googlesites.com/me";
    const github = "github.com/me";
    const linkedin = "linkedin.com/me";
    const twitter = "twitter.com/me";
    const facebook = "facebook.com/me";
    const instagram = "instagram.com/me";
    const college1 = "College 1";
    const college2 = "College 2";
    const from1 = "2012-08-15";
    const to1 = "2016-07-23";
    const from2 = "2021-08-24";
    const to2 = "2023-05-02";
    const q1 = "BS";
    const q2 = "MS";
    const d1 = "Engineering";
    const d2 = "Engineering";
    const p1t = "Project 1";
    const p1l = "github.io/link";
    const p1d =
      "Lorem ipsum dolor";
    const p2t = "Project 2";
    const p2l = "github.io/link1";
    const p2d =
      "Lorem ipsum dolor";
    const p3t = "Project 3";
    const p3l = "github.io/link3";
    const p3d =
      "Lorem ipsum dolor";

    const ex1I = "Google";
    const ex1P = "SDE-III";
    const ex1D = "5 Years";
    const ex1Des =
      "Lorem ipsum dolor";
    const ex2I = "Facebook";
    const ex2P = "SDE-III";
    const ex2D = "5 Years";
    const ex2Des =
      "Lorem ipsum dolor";

    const skill = "Programmer";
    const interest = "Travelling";

    cy.contains("PERSONAL DETAILS");
    cy.get("input[name=firstname]").type(firstname);
    cy.get("input[name=lastname]").type(lastname);
    cy.get("input[name=email]").type(email);
    cy.get("input[name=phone]").type(phone);
    cy.get("input[name=website]").type(website);
    cy.get("input[name=github]").type(github);
    cy.get("input[name=linkedin]").type(linkedin);
    cy.get("input[name=twitter]").type(twitter);
    cy.get("input[name=facebook]").type(facebook);
    cy.get("input[name=instagram]").type(instagram);
    cy.contains("Next").click();

    cy.get("input[name=college]").type(college1);
    cy.get("input[name=fromyear1]").type(from1);
    cy.get("input[name=toyear1]").type(to1);
    cy.get("input[name=qualification1]").type(q1);
    cy.get("input[name=description1]").type(d1);
    cy.get("input[name=school]").type(college2);
    cy.get("input[name=fromyear2]").type(from2);
    cy.get("input[name=toyear2]").type(to2);
    cy.get("input[name=qualification2]").type(q2);
    cy.get("input[name=description2]").type(d2);
    cy.contains("Next").click();

    cy.get("input[name=title1]").type(p1t);
    cy.get("input[name=link1]").type(p1l);
    cy.get("input[name=projectDescription1]").type(p1d);
    cy.get("input[name=title2]").type(p2t);
    cy.get("input[name=link2]").type(p2l);
    cy.get("input[name=projectDescription2]").type(p2d);
    cy.get("input[name=title3]").type(p3t);
    cy.get("input[name=link3]").type(p3l);
    cy.get("input[name=projectDescription3]").type(p3d);
    cy.contains("Next").click();

    cy.get("input[name=institute1]").type(ex1I);
    cy.get("input[name=position1]").type(ex1P);
    cy.get("input[name=duration1]").type(ex1D);
    cy.get("input[name=experienceDescription1]").type(ex1Des);
    cy.get("input[name=institute2]").type(ex2I);
    cy.get("input[name=position2]").type(ex2P);
    cy.get("input[name=duration2]").type(ex2D);
    cy.get("input[name=experienceDescription2]").type(ex2Des);
    cy.contains("Next").click();

    cy.get("input[name=skill1]").type(skill);
    cy.get("input[name=skill2]").type(skill);
    cy.get("input[name=skill3]").type(skill);
    cy.get("input[name=skill4]").type(skill);
    cy.get("input[name=skill5]").type(skill);
    cy.get("input[name=skill6]").type(skill);
    cy.get("input[name=interest1]").type(interest);
    cy.get("input[name=interest2]").type(interest);
    cy.get("input[name=interest3]").type(interest);
    cy.get("input[name=interest4]").type(interest);
    cy.get("input[name=interest5]").type(interest);
    cy.get("input[name=interest6]").type(interest);
    cy.contains("Submit").click();
    cy.contains("Yes").click();
    // cy.url().should("include", "/viewCandidate");

  });
  //   #14 Test for Candidate Session In for Jobs!
  it("Candidate In Session", () => {
    const username = "shanky11@ufl.edu";
    const password = "12345";

    cy.visit("http://localhost:3000/");
    cy.get(".viewas").click().get(".dropdown>.dropdown-menu>a").click();
    cy.contains("CHOOSE YOUR DREAM COMPANY");

    cy.get("#btnlogin").click({ force: true });
    cy.get("input[name=emailId]").type(username);
    cy.get("input[name=Password]").type(password);
    cy.get("input[type=submit].text-input").click();

    cy.contains("Sign Out");
  });
  //   #15 Candidate Logs Out!
  it("Candidate Successfully Logged Out", () => {
    const username = "shanky11@ufl.edu";
    const password = "12345";

    cy.visit("http://localhost:3000/");
    cy.get(".viewas").click().get(".dropdown>.dropdown-menu>a").click();
    cy.contains("CHOOSE YOUR DREAM COMPANY");

    cy.get("#btnlogin").click({ force: true });
    cy.get("input[name=emailId]").type(username);
    cy.get("input[name=Password]").type(password);
    cy.get("input[type=submit].text-input").click();

    cy.contains("Sign Out").click();
  });
  //   #16 Candidate Logs In!

  it("Candidate Logs in JobSeeker", () => {
    const username = "shanky11@ufl.edu";
    const password = "12345";

    cy.visit("http://localhost:3000/");
    cy.get(".viewas").click().get(".dropdown>.dropdown-menu>a").click();
    cy.contains("CHOOSE YOUR DREAM COMPANY");

    cy.get("#btnlogin").click({ force: true });
    cy.get("input[name=emailId]").type(username);
    cy.get("input[name=Password]").type(password);
    cy.get("input[type=submit].text-input").click();

    cy.contains("Sign Out");
  });

  //   #17 Candidate Logs Out!
  it("Candidate Logs Out", () => {
    cy.contains("Sign Out").click();
  });
  //   #18 Candidate Logs In!

  it("Candidate Logs in JobSeeker", () => {
    const username = "shanky11@ufl.edu";
    const password = "12345";

    cy.visit("http://localhost:3000/user");
    cy.contains("CHOOSE YOUR DREAM COMPANY");

    cy.get("#btnlogin").click({ force: true });
    cy.get("input[name=emailId]").type(username);
    cy.get("input[name=Password]").type(password);
    cy.get("input[type=submit].text-input").click();

    cy.contains("Sign Out");
  });
  //   #19 Candidate Is at Jobs Dashboard!
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
  //   #20 Candidate at Dashboard for a job!
  it("Candidate applies for a job", () => {
    cy.contains("CHOOSE YOUR DREAM COMPANY");
    cy.get(".jobs").find("a").contains("SDE II");
    cy.get(".jobs").find("button").should("have.class", "btn-primary");
    cy.get(".jobs")
      .find("button")
      .should("have.class", "btn-primary")
      .first()
      .click();
      // .contains("Applied");
    // cy.contains("Sign Out").click();
  });
  //   #21 Candidate Is at Jobs Dashboard
  it("Candidate logs out", () => {
    cy.contains("CHOOSE YOUR DREAM COMPANY");
    cy.get(".jobs").find("a").contains("SDE II");
    cy.get(".jobs").find("button").should("have.class", "btn-primary");
    // cy.get(".jobs")
    //   .find("button")
    //   .should("have.class", "btn-primary")
    //   .first()
    //   .contains("Applied");
    cy.contains("Sign Out").click();
  });
  //   #22 Candidate Is at Jobs Dashboard

  // it("Candidate Goes to profile Page", () => {
  //   const username = "shanky11@ufl.edu";
  //   const password = "12345";

  //   cy.visit("http://localhost:3000/user");
  //   cy.contains("CHOOSE YOUR DREAM COMPANY");
  //   cy.get("a").contains("Profile").click();
  //   // cy.contains("PERSONAL DETAILS");
  //   cy.contains("Sign Out").click();
  // });
});
