
const URL = "http://localhost:3000/"
const URLpost = "http://localhost:3000/top"

beforeEach(()=>{
    cy.resetDatabase()
    cy.createRecommendations()
})


describe("should create recommendations and show de top scores recommendation at /top", ()=>{  

    it("should upvote a recommendation", () =>{
        console.log("ENTREI AQUI")
        cy.visit(URL);       
        cy.get("#1").get("#upvote").click();

        cy.url().should("equal", URL)
        cy.get("#upvote").should("have.text",1)
        
    })





   
})

