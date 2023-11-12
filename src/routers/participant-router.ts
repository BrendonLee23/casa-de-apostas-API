import { validateBody } from "@/middlewares/validate-middleware";
import { participantSchema } from "@/schemas/participant-schema";
import { Router } from "express";

const participantRouter = Router();

participantRouter.post("/", validateBody(participantSchema));
participantRouter.get("/", );

export default participantRouter;