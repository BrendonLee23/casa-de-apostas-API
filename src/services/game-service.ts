import { notFoundError } from "../errors/not-found-error";
import { CreateGame } from "../protocols";
import { betRepository } from "../repositories/bet-repository";
import { gameRepository } from "../repositories/game-repository";


async function getGames() {
    return gameRepository.findGames()
}

async function postGame(gameBody: CreateGame) {
    return gameRepository.createGame(gameBody)
}

async function getGameWithBetsById(gameId: number) {
    // Buscar informações do jogo
    const game = await gameRepository.findGameById(gameId)
    if (!game) {
        throw notFoundError();
    }
    // Buscar apostas associadas ao jogo
    const bets = await betRepository.findBetsByGameId(gameId)
    if (!bets) {
        throw notFoundError();
    }
    // Combinar informações do jogo e apostas
    const gameWithBets = {
        ...game,
        bets,
    };
    return gameWithBets;
}


export const gameService = {
    getGames,
    postGame,
    getGameWithBetsById
    };
