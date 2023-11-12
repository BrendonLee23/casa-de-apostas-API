import express, { Request, Response, json } from "express";
import "express-async-errors";
import httpStatus from "http-status";
import errorHandlingMiddleware from "./middlewares/error-handler";
import participantRouter from "./routers/participant-router";
import gameRouter from "./routers/game-router";
import betRouter from "./routers/bet-router";

const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => {
  res.status(httpStatus.OK).send("I'm ok!");
});

app.use("/participants", participantRouter);
app.use("/games", gameRouter);
app.use("/bets", betRouter);
app.use(errorHandlingMiddleware);

export default app;