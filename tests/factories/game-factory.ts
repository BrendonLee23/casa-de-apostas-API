import { faker } from '@faker-js/faker';
import { Game } from '@prisma/client';
import prisma from '../../src/database';

export async function createGame(params: Partial<Game> = {}): Promise<Game> {
  return await prisma.game.create({
    data: {
      homeTeamName: params.homeTeamName || faker.company.name(),
      awayTeamName: params.awayTeamName || faker.company.name(),
      homeTeamScore: 0, // Placar inicial 0x0
      awayTeamScore: 0,
      isFinished: params.isFinished || false, // Marcado como não finalizado inicialmente
    },
  });
}

export const generateValidGame = (params: Partial<Game> = {}) => ({
  homeTeamName: params.homeTeamName || faker.company.name(),
  awayTeamName: params.awayTeamName || faker.company.name(),
});
