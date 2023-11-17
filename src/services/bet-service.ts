import { Bet } from '@prisma/client';
import { notFoundError } from '../errors/not-found-error';
import { paymentRequiredError } from '../errors/payment-required-error';
import { CreateBet } from '../protocols';
import { betRepository } from '../repositories/bet-repository';
import { participantRepository } from '../repositories/participant-repository';

async function postBet(betBody: CreateBet): Promise<Bet> {
  // Obter informações do participante
  const id = betBody.participantId;
  const participant = await participantRepository.findParticipantById(id);
  if (!participant) {
    throw notFoundError();
  }
  const amountBet = betBody.amountBet;
  const participantBalance = participant.balance;
  // Verificar se o saldo do participante é suficiente
  if (participantBalance < amountBet) {
    throw paymentRequiredError();
  }
  // Deduzir imediatamente o valor da aposta do saldo do participante
  await participantRepository.updateParticipantBalanceById(id, participantBalance, amountBet);
  // Criar a aposta
  const result = await betRepository.createBet(betBody);

  return result;
}

export const betService = {
  postBet,
};
