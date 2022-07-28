import supertest from "supertest";
import app from "../src/app.js"
import { recommendation, wrongLinkSchemaRecommendation, wrongNameSchemaRecommendation} from "./factories/createRecomendation.js";
import { deleteAllData } from "./factories/deleteAllData.js";
import { prisma } from "../src/database.js"

const agent = supertest(app)

beforeEach(async() => {
    await deleteAllData();
});

describe("POST recommendations /recommendations/", ()=>{

    it('should return 201 when creating a valid recomendation', async ()=>{
        
        const recommendationData = recommendation()
        const response = await agent.post('/recommendations/').send(recommendationData)
        expect(response.status).toBe(201)

        const verifyRecommendation = await prisma.recommendation.findFirst({
            where:{
                name: recommendationData.name,
                youtubeLink: recommendationData.youtubeLink
            }
        })

        
        expect(verifyRecommendation).not.toBe(null)
    })

    it('should return 409 when creating an already existing name recomendation', async ()=>{
        
        const recommendationData = recommendation()
        const firstTrial = await agent.post('/recommendations/').send(recommendationData)
        expect(firstTrial.status).toBe(201)

        const verifyRecommendation = await prisma.recommendation.findFirst({
            where:{
                name: recommendationData.name,
                youtubeLink: recommendationData.youtubeLink
            }
        })        
        expect(verifyRecommendation).not.toBe(null)

        const secondTrial = await agent.post('/recommendations/').send(recommendationData)
        expect(secondTrial.status).toBe(409)
    })
    
 

    it('should return 422 when creating an  invalid link recomendation', async ()=>{ 
        
        const wrongLinkSchema = wrongLinkSchemaRecommendation()
        
        const response = await agent.post('/recommendations/').send(wrongLinkSchema)
        expect(response.status).toBe(422)

        const verifyRecommendation = await  prisma.recommendation.findFirst({
            where:{
                name: wrongLinkSchema.name,
                youtubeLink: wrongLinkSchema.youtubeLink
            }
        })

        expect(verifyRecommendation).toBe(null)
    })

    // it('should return 422 when creating an  invalid name recomendation', async ()=>{ 
        
    //     const wrongNameSchema = wrongNameSchemaRecommendation()
    //     console.log(wrongNameSchema);
        
        
    //     const response = await agent.post('/recommendations/').send(wrongNameSchema)
    //     expect(response.status).toBe(422)

    //     const verifyRecommendation = await  prisma.recommendation.findFirst({
    //         where:{
    //             name: wrongNameSchema.name,
    //             youtubeLink: wrongNameSchema.youtubeLink
    //         }
    //     })

    //     expect(verifyRecommendation).toBe(null)
    // })

})

afterAll(async () => {
    await prisma.$disconnect();
});
  
  
