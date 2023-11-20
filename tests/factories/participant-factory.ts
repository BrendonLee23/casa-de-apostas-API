import { faker } from '@faker-js/faker';
import { Participant } from '@prisma/client';
import prisma from '../../src/database';

export async function createParticipant(params: Partial<Participant> = {}): Promise<Participant> {
  return await prisma.participant.create({
    data: {
      name: params.name || faker.person.firstName(),
      balance: params.balance || faker.number.int(99999999),
    },
  });
}

export const generateValidParticipant = (params: Partial<Participant> = {}) => ({
  name: params.name || faker.person.firstName(),
  balance: params.balance || faker.number.int(99999999),
});

export const generateParticipantWithLowBalance = (params: Partial<Participant> = {}) => ({
  name: params.name || faker.person.firstName(),
  balance: faker.number.int({ min: 0, max: 999 }),
});
