import { prisma } from "../database.js";
import { faker } from "@faker-js/faker";


async function deleteAll() {
    await prisma.$transaction([
      prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY`
    ]);
}

async function resetScore(){
    await prisma.recommendation.updateMany({
        data:{
            score:0
        }
    })
}

async function createTenRecommendations(){
    await prisma.recommendation.createMany({
        data:[{
            name: faker.name.firstName(),
            youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`
        },
        {
            name: faker.name.firstName(),
            youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`
        },
        {
            name: faker.name.firstName(),
            youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`
        },
        {
            name: faker.name.firstName(),
            youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`
        },
        {
            name: faker.name.firstName(),
            youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`
        },
        {
            name: faker.name.firstName(),
            youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`
        },
        {
            name: faker.name.firstName(),
            youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`
        },
        {
            name: faker.name.firstName(),
            youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`
        },
        {
            name: faker.name.firstName(),
            youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`
        },
        {
            name: faker.name.firstName(),
            youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`
        }       
        ],
        skipDuplicates: true        
    })
}




export const e2eRepository = {
    deleteAll,
    resetScore,
    createTenRecommendations
};