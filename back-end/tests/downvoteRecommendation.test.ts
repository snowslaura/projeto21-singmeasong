import supertest from "supertest";
import app from "../src/app.js";
import { deleteAllData } from "./factories/deleteAllData.js";
import {createRecomendation} from "./factories/createRecomendation.js";
import { prisma } from "../src/database.js";
import { faker } from "@faker-js/faker";

const agent = supertest(app)

beforeEach(async() => {
    await deleteAllData();
});

describe("POST recommendations /recommendations/:id/downvote", ()=>{

    it('should return 200 when downvoting', async ()=>{     
        
        const recommendation = await createRecomendation()  
        const {id,score} = await prisma.recommendation.findFirst({
            where:{
                name: recommendation.name
            }
        })          
                
        const response = await agent.post(`/recommendations/${id}/downvote`)
        expect(response.status).toBe(200)

        const verifyScore = await prisma.recommendation.findFirst({
            where:{
                name: recommendation.name
            }
        })        
        expect(verifyScore.score).not.toBeGreaterThanOrEqual(score)
    })

    it('should return 200 when downvoting an recommendation wich has -5 points score', async ()=>{     
        
        const recommendation = await createRecomendation()  

        const {id} = await prisma.recommendation.findFirst({
            where:{
                name: recommendation.name
            }
        })
        
        await prisma.recommendation.update({
            where:{id},
            data:{
                score:-5
            }
        })
                
        const response = await agent.post(`/recommendations/${id}/downvote`)
        expect(response.status).toBe(200)

        const verifyRecommendation = await prisma.recommendation.findFirst({
            where:{
                id,
            }
        })        
        expect(verifyRecommendation).toBe(null)
    })

    
    it('should return 404 when downvoting an unexisting recommendation', async ()=>{    
        
        const number = faker.finance.amount(0,10,0)
        const response = await agent.post(`/recommendations/${number}/downvote`)
        expect(response.status).toBe(404)
      
    })
})

afterAll(async () => {
    await prisma.$disconnect();
});
  