import supertest from "supertest";
import app from "../../src/app.js"
import { deleteAllData } from "./factories/deleteAllData.js";
import { createAtLeastTenRecomendations, createRecomendation, createRecomendationsWithRandomScores } from "./factories/createRecomendation.js";
import { prisma } from "../../src/database.js"
import { faker } from "@faker-js/faker";

const agent = supertest(app)

beforeEach(async() => {
    await deleteAllData();
});

describe("GET recommendations /recommendations/", ()=>{

    it('should return a 10 length array when get recommendations', async ()=>{    
        
        await createAtLeastTenRecomendations()
        
        const {body,status} = await agent.get('/recommendations/random')
        expect(body).toBeTruthy()
        expect(status).toBe(200)
                
    })  

})

afterAll(async () => {
    await prisma.$disconnect();
});