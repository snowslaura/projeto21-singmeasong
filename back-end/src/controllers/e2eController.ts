import {e2eService} from "../services/e2eService.js"
import { Request, Response } from "express";

async function deleteAll(req: Request, res: Response) { 
  
    await e2eService.deleteAll();
  
    res.sendStatus(200);
}

export const e2eController = {
    deleteAll
}