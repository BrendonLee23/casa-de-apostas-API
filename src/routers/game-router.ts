import { Router } from 'express';
import { getGameWithBets, getGames, postGames } from '../controllers/game-controller';
import { validateBody } from '../middlewares/validate-middleware';
import { gameSchema } from '../schemas/game-schema';

const gameRouter = Router();

gameRouter.post('/', validateBody(gameSchema), postGames);
gameRouter.post('/:id/finish', validateBody(gameSchema));
gameRouter.get('/', getGames);
gameRouter.get('/:id', getGameWithBets);

export default gameRouter;
