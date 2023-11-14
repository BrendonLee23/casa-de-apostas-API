import prisma from "../database";
import { CreateGame } from "../protocols";

async function findGames(){
    return await prisma.game.findMany()
}

async function findGameById( gameId: number ){
    const game = await prisma.game.findUnique({
        where: { id: gameId },
    });
    return game;
}

async function createGame(gameBody: CreateGame) {
    const result = await prisma.game.create({
        data: {
            ...gameBody,
            homeTeamScore: 0,   // Placar inicial 0x0
            awayTeamScore: 0,
            isFinished: false,  // Marcado como não finalizado inicialmente
        },
    });
    return result;
}

export const gameRepository = {
    findGames,
    createGame,
    findGameById
    };