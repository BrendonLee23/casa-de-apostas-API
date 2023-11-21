import { faker } from '@faker-js/faker';
import { Bet } from '@prisma/client';
import prisma from '../../src/database';

export async function createBet(params: Partial<Bet> = {}): Promise<Bet> {
  return prisma.bet.create({
    data: {
      homeTeamScore: faker.number.int(99999999),
      awayTeamScore: faker.number.int(99999999),
      amountBet: faker.number.int(99999999),
      gameId: params.gameId || faker.number.int(999999),
      participantId: params.participantId || faker.number.int(99999999),
      status: 'PENDING',
      amountWon: null,
    },
  });
}

export const generateValidBet = (params: Partial<Bet> = {}) => ({
  homeTeamScore: params.homeTeamScore || faker.number.int(99999999),
  awayTeamScore: params.homeTeamScore || faker.number.int(99999999),
  amountBet: params.amountBet || faker.number.int(99999999),
  gameId: params.gameId || faker.number.int(999),
  participantId: params.participantId || faker.number.int(999),
});

export const generateBetWithoutAmont = (params: Partial<Bet> = {}) => ({
  homeTeamScore: params.homeTeamScore || faker.number.int(99999999),
  awayTeamScore: params.homeTeamScore || faker.number.int(99999999),
  amountBet: faker.number.int({ min: -20, max: 0 }),
  gameId: params.gameId || faker.number.int(999),
  participantId: params.participantId || faker.number.int(999),
});
