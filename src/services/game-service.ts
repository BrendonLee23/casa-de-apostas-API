import { Bet } from '@prisma/client';
import { notFoundError } from '../errors/not-found-error';
import { CreateGame, CreateBet } from '../protocols';
import { betRepository } from '../repositories/bet-repository';
import { gameRepository } from '../repositories/game-repository';
import { conflictError } from '../errors/conflict-error';
import { betService } from './bet-service';

async function getGames() {
  return gameRepository.findGames();
}

async function postGame(gameBody: CreateGame) {
  return gameRepository.createGame(gameBody);
}

async function getGameWithBetsById(gameId: number) {
  // Buscar informações do jogo
  const game = await gameRepository.findGameById(gameId);
  if (!game) {
    throw notFoundError('Game not found');
  }
  // Buscar apostas associadas ao jogo
  const bets = await betRepository.findBetsByGameId(gameId);
  if (!bets) {
    throw notFoundError('Bets not found');
  }
  // Combinar informações do jogo e apostas
  const gameWithBets = {
    ...game,
    bets,
  };
  return gameWithBets;
}

async function postGameFinishById(gameId: number, finalScore: CreateBet) {
  const game = await gameRepository.findGameByIdWithBet(gameId);
  if (!game) throw notFoundError('Game not found');
  if (game.isFinished) throw conflictError('This game is already finished');
  const gameResult = await gameRepository.updateScoreboardGameById(gameId, finalScore);
  const bets = await betRepository.findBetsByGameId(gameId);
  if (!bets) throw notFoundError('Bets not found');
  const totalAmount = bets.reduce((total, b) => total + b.amountBet, 0);
  const betWinnersList: Bet[] = [];
  for (const bet of bets) {
    const isCorrectBet = bet.homeTeamScore === finalScore.homeTeamScore && bet.awayTeamScore === finalScore.awayTeamScore;
    if (isCorrectBet) betWinnersList.push(bet);
  }
  const totalWinningAmount = betWinnersList.reduce((total, b) => total + b.amountBet, 0);
  for (const bet of bets) {
    await betService.updateBetStatusAndAmount(bet, totalAmount, totalWinningAmount, betWinnersList);
  }
  return gameResult;
}

export const gameService = {
  getGames,
  postGame,
  getGameWithBetsById,
  postGameFinishById,
};
