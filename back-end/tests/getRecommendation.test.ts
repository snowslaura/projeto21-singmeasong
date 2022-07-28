import supertest from "supertest";
import app from "../src/app.js"
import { deleteAllData } from "./factories/deleteAllData.js";
import { createAtLeastTenRecomendations } from "./factories/createRecomendation.js";
import { prisma } from "../src/database.js"

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

afterAll(async () => {
    await prisma.$disconnect();
});