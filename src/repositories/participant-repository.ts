import prisma from "../database";
import { CreateParticipant } from "../protocols";


export function getAllParticipants() {
    return prisma.participant.findMany();
    }

export function createParticipants(participantBody: CreateParticipant){
    const result = prisma.participant.create({
        data: participantBody
    })
    return result;
}

export async function findParticipant( id: number ){
    return await prisma.participant.findUnique({
        where: { id: id },
    });
}

export async function updateParticipantBalanceById(id: number, participantBalance: number, amountBet: number){
    return await prisma.participant.update({
        where: { id: id },
        data: {
            balance: participantBalance - amountBet,
        },
    });
}

export const participantRepository = {
    getAllParticipants,
    createParticipants,
    findParticipant,
    updateParticipantBalanceById
    };