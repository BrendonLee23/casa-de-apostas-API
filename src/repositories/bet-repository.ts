import prisma from "@/database";
import { CreateBet } from "@/protocols";

async function createBet( betBody: CreateBet){
    const result = await prisma.bet.create({
        data: {
            homeTeamScore: betBody.homeTeamScore,
            awayTeamScore: betBody.awayTeamScore,
            amountBet: betBody.amountBet,
            gameId: betBody.gameId,
            participantId: betBody.participantId,
            status: 'PENDING', // Aposta é criada como PENDING inicialmente
            amountWon: null,    // Valor ganho é nulo quando a aposta é PENDING
        },
    });
    return result;
}

export const betRepository = {
    createBet
    };