
import { Request, Response } from "express";
import httpStatus from "http-status";
import { CreateBet } from "../protocols";
import { betService } from "../services/bet-service";

export async function postBet(req: Request, res: Response) {
    const betBody = req.body as CreateBet;
    const bet = await betService.postBet( betBody );
    res.status(httpStatus.OK).send(bet);
}