import { CreateGame } from "@/protocols";
import { gameRepository } from "@/repositories/game-repository";

async function getGames(){
    return gameRepository.findGames()
}

async function postGame(gameBody: CreateGame){
    return gameRepository.createGame(gameBody)
}

export const gameService = {
    getGames,
    postGame,
    };
