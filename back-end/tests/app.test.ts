import supertest from "supertest";
import app from "./../src/app.js"
import { recommendation, wrongLinkSchemaRecommendation} from "./factories/createRecomendation.js";
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

})

afterAll(async () => {
    await prisma.$disconnect();
});
  
  
