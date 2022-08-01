/// <reference types="cypress"/>

import { faker } from "@faker-js/faker"

const URL = "http://localhost:3000/"

beforeEach(() => {
	cy.resetDatabase();
});

describe("Post recommendation", ()=>{
    it("should post a recommendation", () =>{
        const recommendation = {
            name: faker.name.firstName(),
            youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`
        }
        cy.visit(URL);
        cy.get("#name").type(recommendation.name);
        cy.get("#link").type(recommendation.youtubeLink)
        cy.get("#button").click();

        cy.url().should("equal", URL)
        
    })
})





  
