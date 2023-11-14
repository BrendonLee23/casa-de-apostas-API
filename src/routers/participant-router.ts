
import { Router } from "express";
import { getParticipants, postParticipants } from "../controllers/participant-controller";
import { validateBody } from "../middlewares/validate-middleware";
import { participantSchema } from "../schemas/participant-schema";

const participantRouter = Router();

participantRouter.post("/", validateBody(participantSchema), postParticipants);
participantRouter.get("/", getParticipants);

export default participantRouter;