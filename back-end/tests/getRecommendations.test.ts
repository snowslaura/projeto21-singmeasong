import supertest from "supertest";
import app from "../src/app.js"
import { deleteAllData } from "./factories/deleteAllData.js";
import { createAtLeastTenRecomendations, createRecomendation, createRecomendationsWithRandomScores } from "./factories/createRecomendation.js";
import { prisma } from "../src/database.js"
import { faker } from "@faker-js/faker";

const agent = supertest(app)

beforeEach(async() => {
    await deleteAllData();
});

describe("GET recommendations /recommendations/", ()=>{

    it('should return a 10 length array when get recommendations', async ()=>{    
        
        await createAtLeastTenRecomendations()
        
        const {body} = await agent.get('/recommendations/')
        expect(body).toHaveLength(10)
                
    })  

})

describe("GET recommendations /recommendations/:id",()=> {
    it('should return a certain recommendation ', async ()=>{    
        
        const {id} = await createRecomendation()        
        const {body} = await agent.get(`/recommendations/${id}`)
        expect(body).not.toBe(null)
                
    }) 

    it('should return 404 to invalid recommendation ', async ()=>{    
        
        const id = faker.finance.amount(0,100,0)
        const {status} = await agent.get(`/recommendations/${id}`)
        expect(status).toBe(404)
                
    }) 
})

describe("GET recommendations /recommendations/top/:amount",()=> {
    it('should return the amount of recommendations sort by greater scores ', async ()=> {  

        const amount = parseInt(faker.finance.amount(1,10,0)); 

        const recomendations = await createRecomendationsWithRandomScores(amount);
        const FirstGreaterScoresRecommendations = recomendations.slice(0,amount);         

        const {body} = await agent.get(`/recommendations/top/${amount}`);

        expect(body[0]).toStrictEqual(FirstGreaterScoresRecommendations[0])
        expect(body[amount-1]).toStrictEqual(FirstGreaterScoresRecommendations[amount-1])

    }) 

    it('should return 404 to invalid recommendation ', async ()=>{    
        
        const id = faker.finance.amount(0,100,0)
        const {status} = await agent.get(`/recommendations/${id}`)
        expect(status).toBe(404)
                
    }) 
})

afterAll(async () => {
    await prisma.$disconnect();
});