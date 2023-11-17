import joi from 'joi';
import { CreateGame, CreateGameFinish, Params } from '../protocols';

export const gameSchema = joi.object<CreateGame>({
  homeTeamName: joi.string().required(),
  awayTeamName: joi.string().required(),
});

export const gameFinishSchema = joi.object<CreateGameFinish>({
  homeTeamScore: joi.number().integer().min(0).required(),
  awayTeamScore: joi.number().integer().min(0).required(),
});

export const gameParamsSchema = joi.object<Params>({
  id: joi.number().integer().greater(0).required(),
});
