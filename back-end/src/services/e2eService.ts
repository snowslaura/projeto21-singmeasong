import { e2eRepository } from "../repositories/e2eRepository.js";


async function deleteAll(){
  await e2eRepository.deleteAll(); 
}

export const e2eService = {
    deleteAll
}
