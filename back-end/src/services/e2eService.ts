import { e2eRepository } from "../repositories/e2eRepository.js";


async function deleteAll(){
  await e2eRepository.deleteAll(); 
}

async function resetScore(){
  await e2eRepository.resetScore()
}

async function createTenRecommendations(){
  await e2eRepository.createTenRecommendations()
}

export const e2eService = {
    deleteAll,
    resetScore,
    createTenRecommendations
}
