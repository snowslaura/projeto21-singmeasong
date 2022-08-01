/// <reference types="cypress"/>

const URL = "http://localhost:3000/"

beforeEach(()=>{
    cy.resetScore()
})


describe("should upvote a recommendation", ()=>{
    it("should upvote a recommendation", () =>{
       
        cy.visit(URL);       
        cy.get("#downvote-1").click();

        cy.url().should("equal", URL)
        cy.get("#row").should("have.text",-1)
        
    })
})
