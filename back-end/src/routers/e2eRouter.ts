import { Router } from "express";
import { e2eController } from "../controllers/e2eController.js";

const e2eRouter = Router();

e2eRouter.post("/reset", e2eController.deleteAll);
e2eRouter.post("/reset/score", e2eController.resetScore);
e2eRouter.post("/create/recommendations", e2eController.createTenRecommendations);


export default e2eRouter;