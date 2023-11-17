import { faker } from '@faker-js/faker';
import prisma from '../../src/database';
import { CreateBet } from '../../src/protocols';

export async function createBet(betBody: CreateBet) {
  return await prisma.bet.create({
    data: {
      homeTeamScore: betBody.homeTeamScore || faker.number.int(),
      awayTeamScore: betBody.awayTeamScore || faker.number.int(),
      amountBet: betBody.amountBet || faker.number.int(),
      gameId: betBody.gameId,
      participantId: betBody.participantId,
      status: 'PENDING', // Aposta é criada como PENDING inicialmente
      amountWon: null, // Valor ganho é nulo quando a aposta é PENDING
    },
  });
}
