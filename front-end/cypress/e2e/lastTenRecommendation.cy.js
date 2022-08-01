import { faker } from "@faker-js/faker"

const URL = "http://localhost:3000/"

beforeEach(()=>{
    cy.resetDatabase()
    cy.createRecommendations() // creates 10 recommendations
})


describe("should post a recommendation and be shown in the first position", ()=>{

    it("should post a recommendation and be shown in the first position", () =>{
        const recommendation = {
            name: faker.name.firstName(),
            youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`
        }
        cy.visit(URL);
        cy.get("#name").type(recommendation.name);
        cy.get("#link").type(recommendation.youtubeLink)
        cy.get("#button").click();
        cy.url().should("equal", URL)
        cy.get("#11").should('be.visible')         
    })
   
})
