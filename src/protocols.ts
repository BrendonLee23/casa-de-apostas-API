import { Bet, Game, Participant } from "@prisma/client";

export type ApplicationError = {
    name: string;
    message: string;
    };


export type CreateParticipant = Omit<Participant, "id" | "createAt" | "updateAt">;

export type CreateGame = Omit<Game, "id" | "createAt" | "updateAt" | "homeTeamScore" | "awayTeamScore" | "isFinished">;

export type CreateBet = Omit<Bet, "id" | "createAt" | "updateAt" | "status" | "amountWon">;