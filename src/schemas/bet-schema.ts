import joi from 'joi';
import { CreateBet } from '../protocols';

export const betSchema = joi.object<CreateBet>({
  homeTeamScore: joi.number().integer().required(),
  awayTeamScore: joi.number().integer().required(),
  amountBet: joi.number().integer().required(),
  gameId: joi.number().integer().required(),
  participantId: joi.number().integer().required(),
});
