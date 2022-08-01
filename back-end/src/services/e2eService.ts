import { e2eRepository } from "../repositories/e2eRepository.js";


async function deleteAll(){
  await e2eRepository.deleteAll(); 
}

async function resetScore(){
  await e2eRepository.resetScore()
}

export const e2eService = {
    deleteAll,
    resetScore
}
