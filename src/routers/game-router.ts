import { validateBody } from "@/middlewares/validate-middleware";
import { gameSchema } from "@/schemas/game-schema";
import { Router } from "express";

const gameRouter = Router();

gameRouter.post("/", validateBody(gameSchema));
gameRouter.post("/:id/finish", validateBody(gameSchema));
gameRouter.get("/", );
gameRouter.get("/:id", );

export default gameRouter;