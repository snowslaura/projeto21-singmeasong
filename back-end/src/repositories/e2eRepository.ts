import { prisma } from "../database.js";

async function deleteAll(){
    await prisma.recommendation.deleteMany({})
}

async function resetScore(){
    await prisma.recommendation.updateMany({
        data:{
            score:0
        }
    })
}


export const e2eRepository = {
    deleteAll,
    resetScore
};