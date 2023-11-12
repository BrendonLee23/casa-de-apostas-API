import prisma from "@/database";
import { CreateParticipant } from "@/protocols";

export function getAllParticipants() {
    return prisma.participant.findMany();
    }

export function createParticipants(participantBody: CreateParticipant){
    const result = prisma.participant.create({
        data: participantBody
    })
    return result;
}

export const participantRepository = {
    getAllParticipants,
    createParticipants,
    };