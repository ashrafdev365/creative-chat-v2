/// <reference types="cypress" />

it("google test", () => {
  cy.visit("http://localhost:3000/chat");

  cy.get(".users_section > :nth-child(1)").click();

  cy.get(".message").type("hello world!");
  cy.contains("Send").click();
  cy.get(".message").type("how are you");
  cy.contains("Send").click();
  cy.get(".message").type("Fine");
  cy.contains("Send").click();
  cy.get(".message").type("Everything is Ok");
  cy.contains("Send").click();
  cy.get(".message").type("What do you think");
  cy.contains("Send").click();
  cy.get(".message").type("how is this going");
  cy.contains("Send").click();
  cy.get(".message").type("Fine");
  cy.contains("Send").click();
  cy.get(".message").type("Everything is Ok");
  cy.contains("Send").click();
  cy.get(".message").type("What do you think");
  cy.contains("Send").click();
  cy.get(".message").type("how is this going");
  cy.contains("Send").click();
  cy.get(".message").type("Ok");
  cy.contains("Send").click();

  cy.get('nav > .fas').click();

  cy.get(".users_section > :nth-child(2)").click();

  cy.get(".message").type("hello world!");
  cy.contains("Send").click();
  cy.get(".message").type("how are you");
  cy.contains("Send").click();
  cy.get(".message").type("Fine");
  cy.contains("Send").click();
  cy.get(".message").type("Everything is Ok");
  cy.contains("Send").click();
  cy.get(".message").type("What do you think");
  cy.contains("Send").click();
  cy.get(".message").type("Fine");
  cy.contains("Send").click();
  cy.get(".message").type("Everything is Ok");
  cy.contains("Send").click();
  cy.get(".message").type("What do you think");
  cy.contains("Send").click();
  cy.get(".message").type("how is this going");
  cy.contains("Send").click();
  cy.get(".message").type("how is this going");
  cy.contains("Send").click();
  cy.get(".message").type("Ok");
  cy.contains("Send").click();

  cy.get('nav > .fas').click();

  cy.get(".users_section > :nth-child(3)").click();

  cy.get(".message").type("hello world!");
  cy.contains("Send").click();
  cy.get(".message").type("how are you");
  cy.contains("Send").click();
  cy.get(".message").type("Fine");
  cy.contains("Send").click();
  cy.get(".message").type("Everything is Ok");
  cy.contains("Send").click();
  cy.get(".message").type("What do you think");
  cy.get(".message").type("Fine");
  cy.contains("Send").click();
  cy.get(".message").type("Everything is Ok");
  cy.contains("Send").click();
  cy.get(".message").type("What do you think");
  cy.contains("Send").click();
  cy.get(".message").type("how is this going");
  cy.contains("Send").click();
  cy.contains("Send").click();
  cy.get(".message").type("how is this going");
  cy.contains("Send").click();
  cy.get(".message").type("Ok");
  cy.contains("Send").click();
  
  cy.get('nav > .fas').click();

});
  // cy.contains("Continue").click();
  // cy.get('.users_section > :nth-child(1)').click()
  // cy.get('.message').type('hello world!')
  // cy.contains('Send').click()

  // cy.get(".settings_btn").click();
  // cy.get(".settings > p").click();
  // cy.contains("Sign Up").click();
  // cy.contains("Log in").click();

  // cy.get('[type="email"]').type('user@gmail.com')
  // cy.get('[type="password"]').type("1234567");
  // cy.get(".submit").click();