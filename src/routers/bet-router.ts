
import { Router } from "express";
import { postBet } from "../controllers/bet-controller";
import { validateBody } from "../middlewares/validate-middleware";
import { betSchema } from "../schemas/bet-schema";

const betRouter = Router();

betRouter.post("/", validateBody(betSchema), postBet);

export default betRouter;