import { Bet } from '@prisma/client';
import prisma from '../database';
import { CreateBet, betBody } from '../protocols';
import { participantRepository } from './participant-repository';

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
// eslint-disable-next-line prettier/prettier
async function updateBetStatusAndAmount(bet: Bet, totalAmount: number, totalWinningAmount: number, betWinnersList: Bet[]) {
  if (betWinnersList.includes(bet)) {
    bet.status = 'WON';
    const statusBet = bet.status;
    const amountWon = (bet.amountBet / totalWinningAmount) * totalAmount * (1 - 0.3);
    bet.amountWon = Math.floor(amountWon);
    const id = bet.participantId;
    const participant = await participantRepository.findParticipantById(id);
    participant.balance += bet.amountWon;
    await participantRepository.updateParticipantBalanceWhenWinning(participant);
    await betRepository.updateBet(bet, statusBet, amountWon);
  } else {
    bet.status = 'LOST';
    const statusBet = bet.status;
    bet.amountWon = 0;
    const amountWon = bet.amountWon;
    await betRepository.updateBet(bet, statusBet, amountWon);
  }
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
  updateBetStatusAndAmount,
  updateBet,
};
