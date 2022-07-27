import { faker } from "@faker-js/faker";

import { prisma } from "../../src/database.js";


export function recommendation(){
  const data = {
    name: faker.name.firstName(),
    youtubeLink: `www.youtube.com/watch?v=${faker.random.word()}`
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

// export async function createRecomendation() {
//   const recomendation = await prisma.recommendation.create({
//     data: {
//       name: faker.name.firstName(),
//       youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric()}`
//     }
//   });

//   return recomendation;
// }

// export  async function createInvalidRecomendation() {
//   const recomendation = await prisma.recommendation.create({
//     data: {
//       name: faker.name.firstName(),
//       youtubeLink: `www.youtube.com/watch?v=${faker.random.alphaNumeric()}`
//     }
//   });

//   return recomendation;
// }






afterAll(async () => {
  await prisma.$disconnect();
});