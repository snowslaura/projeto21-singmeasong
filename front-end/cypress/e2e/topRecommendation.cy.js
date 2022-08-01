
const URL = "http://localhost:3000"
const URLtop = "http://localhost:3000/top"

beforeEach(()=>{
    cy.resetDatabase()
    cy.createRecommendations()
})


describe("should create recommendations and show the top scores recommendation at /top", ()=>{  
    it("should upvote a recommendation", () =>{
        cy.visit(URL); 
        cy.get("#upvote-1").click();
        cy.visit(URLtop);  
        cy.get('div>article').eq(0).should("have.id",1)    
        // cy.get("#1").eq(0)   
        
    })
})

