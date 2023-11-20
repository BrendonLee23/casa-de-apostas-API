import supertest from 'supertest';
import httpStatus from 'http-status';
import { generateValidGame } from '../../tests/factories/game-factory';
import { loadEnv } from '../../src/config/envs';
import { cleanDb } from '../helpers';
import app from '../../src/app';

const server = supertest(app);

beforeAll(async () => {
  await cleanDb();
});

beforeEach(async () => {
  loadEnv();
  await cleanDb();
});

describe('POST /games', () => {
  describe('When recieve a body valide', () => {
    it('should create a Game and return status code 200 OK', async () => {
      const response = generateValidGame();
      const result = await server.post('/games').send(response);
      expect(result.status).toBe(httpStatus.OK);
      expect(result.body).toEqual({
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        homeTeamName: response.homeTeamName,
        awayTeamName: response.awayTeamName,
        homeTeamScore: expect.any(Number),
        awayTeamScore: expect.any(Number),
        isFinished: expect.any(Boolean),
      });
    });
  });
});
