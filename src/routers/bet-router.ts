import { validateBody } from "@/middlewares/validate-middleware";
import { betSchema } from "@/schemas/bet-schema";
import { Router } from "express";

const betRouter = Router();

betRouter.post("/", validateBody(betSchema));

export default betRouter;