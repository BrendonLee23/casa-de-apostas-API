import { Bet } from '@prisma/client';
import { notFoundError } from '../errors/not-found-error';
import { paymentRequiredError } from '../errors/payment-required-error';
import { CreateBet } from '../protocols';
import { betRepository } from '../repositories/bet-repository';
import { participantRepository } from '../repositories/participant-repository';
import { badRequestError } from 'src/errors/bad-request-error';

async function postBet(betBody: CreateBet): Promise<Bet> {
  const id = betBody.participantId;
  const participant = await participantRepository.findParticipantById(id);
  if (!participant) throw notFoundError('Participant not found');
  const amountBet = betBody.amountBet;
  const participantBalance = participant.balance;
  // Verificar se o saldo do participante é suficiente ou se não é negativo/0
  if (amountBet <= 0) throw badRequestError('Balance cannot be negative or 0');
  if (participantBalance < amountBet) throw paymentRequiredError('Balance must be greater than or equal to amount');
  // Deduzir imediatamente o valor da aposta do saldo do participante
  await participantRepository.updateParticipantBalanceById(id, participantBalance, amountBet);
  // Criar a aposta
  const result = await betRepository.createBet(betBody);
  return result;
}

export const betService = {
  postBet,
};
