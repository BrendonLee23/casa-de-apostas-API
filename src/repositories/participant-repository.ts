import prisma from '../database';
import { CreateParticipant, ParticipantBalance } from '../protocols';

export function getAllParticipants() {
  return prisma.participant.findMany();
}

export function createParticipants(participantBody: CreateParticipant) {
  const result = prisma.participant.create({
    data: participantBody,
  });
  return result;
}

export async function findParticipantById(id: number) {
  return await prisma.participant.findUnique({
    where: { id: id },
  });
}

export async function findParticipantByName(name: string) {
  return await prisma.participant.findUnique({
    where: { name: name },
  });
}

export async function updateParticipantBalanceById(id: number, participantBalance: number, amountBet: number) {
  return await prisma.participant.update({
    where: { id: id },
    data: {
      balance: participantBalance - amountBet,
    },
  });
}

export async function updateParticipantBalanceWhenWinning(participant: ParticipantBalance) {
  return await prisma.participant.update({
    where: { id: participant.id },
    data: {
      balance: participant.balance,
    },
  });
}

export const participantRepository = {
  getAllParticipants,
  createParticipants,
  findParticipantById,
  findParticipantByName,
  updateParticipantBalanceById,
  updateParticipantBalanceWhenWinning,
};
