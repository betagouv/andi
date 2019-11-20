/// <reference types="Cypress" />
describe("Accessibility checks", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.injectAxe()
    cy.wait(500)
  })
  it("Has no detectable a11y violations on load", () => {
    cy.checkA11y()
  })
  // it("Navigates to inscription and checks for violations", () => {
  //   cy.findAllByText(/je m'inscris/i)
  //     .first()
  //     .click()
  //     .checkA11y()
  // })
})
