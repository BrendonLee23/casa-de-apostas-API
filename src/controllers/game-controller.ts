import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { gameService } from '../services/game-service';
import { CreateBet, CreateGame } from './../protocols';

export async function getGames(req: Request, res: Response) {
  const games = await gameService.getGames();
  res.status(httpStatus.OK).send(games);
}

export async function postGames(req: Request, res: Response) {
  const gameBody = req.body as CreateGame;
  const game = await gameService.postGame(gameBody);
  res.status(httpStatus.OK).send(game);
}

export async function getGameWithBets(req: Request, res: Response) {
  const { id } = req.params;
  const gameId = parseInt(id);
  const result = await gameService.getGameWithBetsById(gameId);
  res.status(httpStatus.OK).send(result);
}

export async function postGameFinishById(req: Request, res: Response) {
  const { id } = req.params;
  const gameId = parseInt(id);
  const finalScore = req.body as CreateBet;
  const result = await gameService.postGameFinishById(gameId, finalScore);
  res.status(httpStatus.OK).send(result);
}
