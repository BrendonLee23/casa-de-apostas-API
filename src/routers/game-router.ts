import { Router } from 'express';
import { getGameWithBets, getGames, postGameFinishById, postGames } from '../controllers/game-controller';
import { validateBody, validateParams } from '../middlewares/validate-middleware';
import { gameFinishSchema, gameParamsSchema, gameSchema } from '../schemas/game-schema';

const gameRouter = Router();

gameRouter.post('/', validateBody(gameSchema), postGames);
gameRouter.post('/:id/finish', validateParams(gameParamsSchema), validateBody(gameFinishSchema), postGameFinishById);
gameRouter.get('/', getGames);
gameRouter.get('/:id', validateParams(gameParamsSchema), getGameWithBets);

export default gameRouter;
