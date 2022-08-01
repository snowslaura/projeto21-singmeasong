import supertest from "supertest";
import app from "../../src/app.js";
import { deleteAllData } from "./factories/deleteAllData.js";
import {createRecomendation} from "./factories/createRecomendation.js";
import { prisma } from "../../src/database.js";
import { faker } from "@faker-js/faker";

const agent = supertest(app)

beforeEach(async() => {
    await deleteAllData();
});

describe("POST recommendations /recommendations/:id/upvote", ()=>{

    it('should return 200 when upvoting', async ()=>{     
        
        const recommendation = await createRecomendation()  
        const {id,score} = await prisma.recommendation.findFirst({
            where:{
                name: recommendation.name
            }
        })
        
        
        const response = await agent.post(`/recommendations/${id}/upvote`)
        expect(response.status).toBe(200)

        const verifyScore = await prisma.recommendation.findFirst({
            where:{
                name: recommendation.name
            }
        })        
        expect(verifyScore.score).toBeGreaterThan(score)
    })

    const number = faker.finance.amount(0,10,0)

    it('should return 404 when upvoting an unexisting recommendation', async ()=>{    
                        
        const response = await agent.post(`/recommendations/${number}/upvote`)
        expect(response.status).toBe(404)
      
    })
})

afterAll(async () => {
    await prisma.$disconnect();
});
  