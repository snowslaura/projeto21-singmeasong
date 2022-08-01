
const URL = "http://localhost:3000"
const URLtop = "http://localhost:3000/top"

beforeEach(()=>{
    cy.resetDatabase()
    cy.createRecommendations()
})


describe("should change place when downvoting", ()=>{  
    it("should upvote a recommendation", () =>{
        cy.visit(URL); 
        cy.get("#upvote-1").click();
        cy.visit(URLtop);      
        cy.get('div>article').eq(0).should("have.id",1)           
    
        cy.get("#downvote-1").click(); 
        cy.get("#downvote-1").click();  
        cy.get("#downvote-1").click();   
        cy.get('div>article').eq(9).should("have.id",1)     
                    
    })
})