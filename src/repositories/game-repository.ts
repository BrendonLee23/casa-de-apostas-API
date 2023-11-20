import prisma from '../database';
import { CreateGame, CreateBet } from '../protocols';

async function findGames() {
  return await prisma.game.findMany();
}

async function findGameById(gameId: number) {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
  });
  return game;
}

async function findGameNotFinishedById(gameId: number) {
  const game = await prisma.game.findUnique({
    where: { id: gameId, isFinished: false },
  });
  return game;
}

async function findGameByIdWithBet(gameId: number) {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      Bet: {
        include: {
          Participant: true,
        },
      },
    },
  });
  return game;
}

async function createGame(gameBody: CreateGame) {
  const result = await prisma.game.create({
    data: {
      ...gameBody,
      homeTeamScore: 0, // Placar inicial 0x0
      awayTeamScore: 0,
      isFinished: false, // Marcado como não finalizado inicialmente
    },
  });
  return result;
}

async function updateScoreboardGameById(gameId: number, finalScore: CreateBet) {
  const result = await prisma.game.update({
    where: { id: gameId },
    data: {
      homeTeamScore: finalScore.homeTeamScore,
      awayTeamScore: finalScore.awayTeamScore,
      isFinished: true,
    },
  });
  return result;
}

export const gameRepository = {
  findGames,
  createGame,
  findGameById,
  updateScoreboardGameById,
  findGameByIdWithBet,
  findGameNotFinishedById,
};
