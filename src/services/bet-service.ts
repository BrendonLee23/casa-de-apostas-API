import { Bet } from '@prisma/client';
import { notFoundError } from '../errors/not-found-error';
import { paymentRequiredError } from '../errors/payment-required-error';
import { CreateBet } from '../protocols';
import { betRepository } from '../repositories/bet-repository';
import { participantRepository } from '../repositories/participant-repository';
import { badRequestError } from '../../src/errors/bad-request-error';
import { gameRepository } from './../repositories/game-repository';

async function postBet(betBody: CreateBet): Promise<Bet> {
  const id = betBody.participantId;
  const participant = await participantRepository.findParticipantById(id);
  if (!participant) throw notFoundError('Participant not found');
  const amountBet = betBody.amountBet;
  const participantBalance = participant.balance;
  if (amountBet <= 0) throw badRequestError('Balance cannot be negative or 0');
  if (participantBalance < amountBet) throw paymentRequiredError('Balance must be greater than or equal to amount');
  const gameId = betBody.gameId;
  const gameNotFinished = await gameRepository.findGameNotFinishedById(gameId);
  if (!gameNotFinished) throw badRequestError('This game has already been finished');
  await participantRepository.updateParticipantBalanceById(id, participantBalance, amountBet);
  const result = await betRepository.createBet(betBody);
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

export const betService = {
  postBet,
  updateBetStatusAndAmount,
};
