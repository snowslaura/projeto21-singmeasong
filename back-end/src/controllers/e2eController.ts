import {e2eService} from "../services/e2eService.js"
import { Request, Response } from "express";

async function deleteAll(req: Request, res: Response) {   
    await e2eService.deleteAll();  
    res.sendStatus(200);
}

async function resetScore(req: Request, res: Response) {  
    await e2eService.resetScore();  
    res.sendStatus(200);
}

async function createTenRecommendations(req: Request, res: Response){
    await e2eService.createTenRecommendations();  
    res.sendStatus(201);
}


export const e2eController = {
    deleteAll,
    resetScore,
    createTenRecommendations
}