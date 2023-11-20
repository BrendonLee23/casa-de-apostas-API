import supertest from 'supertest';
import httpStatus from 'http-status';
import { loadEnv } from '../../src/config/envs';
import { cleanDb } from '../helpers';
import app from '../../src/app';
import { createParticipant } from '../../tests/factories/participant-factory';
import { createGame } from '../../tests/factories/game-factory';
import prisma from '../../src/database';
import { generateBetWithoutAmont, generateValidBet } from './../factories/bet-factory';

const server = supertest(app);

beforeAll(async () => {
  await cleanDb();
});

beforeEach(async () => {
  loadEnv();
  await cleanDb();
});

describe('POST /bets', () => {
  it('should return status 400 when creating a bet with a value 0 or negative', async () => {
    const participant = await createParticipant();
    await createGame();
    const bet = generateBetWithoutAmont({ participantId: participant.id });
    const response = await server.post('/bets').send(bet);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.text).toBe('The request was invalid: Balance cannot be negative or 0');
  });
  it('should return status 403 when amontBet is greater than partcipant balance', async () => {
    const participant = await createParticipant();
    const bet = generateValidBet({ participantId: participant.id, amountBet: participant.balance + 2000 });
    const response = await server.post('/bets').send(bet);
    expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
    expect(response.text).toBe('Payment Required or insufficient: Balance must be greater than or equal to amount');
  });
  describe('When body is valided', () => {
    it('should return status 200 when update participant balance create bet', async () => {
      const participant = await createParticipant();
      const game = await createGame();
      const bet = generateValidBet({ participantId: participant.id, amountBet: participant.balance, gameId: game.id });
      const response = await server.post('/bets').send(bet);
      const participantUpdated = await prisma.participant.findFirst({
        where: { id: participant.id },
      });

      expect(participantUpdated.balance).toBe(participant.balance - bet.amountBet);
      expect(response.body).toEqual({
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        homeTeamScore: expect.any(Number),
        awayTeamScore: expect.any(Number),
        amountBet: expect.any(Number),
        gameId: expect.any(Number),
        participantId: expect.any(Number),
        status: expect.any(String),
        amountWon: null,
      });
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});
