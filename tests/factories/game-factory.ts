import { faker } from '@faker-js/faker';
import prisma from '../../src/database';

export async function createGame(homeTeamName: string, awayTeamName: string) {
    return await prisma.game.create({
        data: {
            homeTeamName: homeTeamName || faker.company.name(),
            awayTeamName: awayTeamName || faker.company.name(),
            homeTeamScore: 0,   // Placar inicial 0x0
            awayTeamScore: 0,
            isFinished: false,  // Marcado como não finalizado inicialmente
        },
    });
}