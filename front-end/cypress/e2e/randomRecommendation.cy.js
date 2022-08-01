const URL = "http://localhost:3000"
const URLrandom = "http://localhost:3000/random"

beforeEach(()=>{
    cy.resetDatabase()
    cy.createRecommendations()
})


describe("should show a random recommendation ", ()=>{  
    it("should upvote a recommendation", () =>{
        cy.visit(URL);         
        cy.visit(URLrandom);      
        cy.get('article div').eq(0).should('be.visible')                    
    })
})