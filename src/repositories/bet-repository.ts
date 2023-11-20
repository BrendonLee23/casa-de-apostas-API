import prisma from '../database';
import { CreateBet, betBody } from '../protocols';

async function createBet(betBody: CreateBet) {
  const result = await prisma.bet.create({
    data: {
      homeTeamScore: betBody.homeTeamScore,
      awayTeamScore: betBody.awayTeamScore,
      amountBet: betBody.amountBet,
      gameId: betBody.gameId,
      participantId: betBody.participantId,
      status: 'PENDING', // Aposta é criada como PENDING inicialmente
      amountWon: null, // Valor ganho é nulo quando a aposta é PENDING
    },
  });
  return result;
}

async function findBetsByGameId(gameId: number) {
  const result = await prisma.bet.findMany({
    where: { gameId },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      homeTeamScore: true,
      awayTeamScore: true,
      amountBet: true,
      gameId: true,
      participantId: true,
      status: true,
      amountWon: true,
    },
  });
  return result;
}

async function updateBet(bet: betBody, status: string, amountWon: number) {
  const result = await prisma.bet.update({
    where: { id: bet.id },
    data: {
      status: status,
      amountWon: amountWon,
    },
  });
  return result;
}

export const betRepository = {
  createBet,
  findBetsByGameId,
  updateBet,
};
