import { faker } from '@faker-js/faker';
import prisma from '../../src/database';

export async function createParticipant() {
  return await prisma.participant.create({
    data: {
      name: faker.person.firstName(),
      balance: faker.number.int(),
    },
  });
}
