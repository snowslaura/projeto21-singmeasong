import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database.js";


export function recommendation(){
  const data = {
    name: faker.name.firstName(),
    youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`
  }
  return data
}

export function wrongNameSchemaRecommendation(){
  const data = {
    name: parseInt(faker.finance.amount(0,10,0)),
    youtubeLink: faker.internet.url()
  }
  return data
}

export function wrongLinkSchemaRecommendation(){
  const data = {
    name: faker.name.firstName(),
    youtubeLink: faker.internet.url()
  }
  return data
}

export async function createRecomendation() {
  const recomendation = await prisma.recommendation.create({
    data: {
      name: faker.name.firstName(),
      youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`
    }
  });

  return recomendation;
}

export async function createAtLeastTenRecomendations() {
  let recomendationsArray =[]
  for(let i=0;i<11;i++){
    const recommendation = await prisma.recommendation.create({
      data: {
        name: faker.name.firstName(),
        youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric(10)}`
      }
    });
    recomendationsArray.push(recommendation)
  }

  return recomendationsArray;
}


afterAll(async () => {
  await prisma.$disconnect();
});