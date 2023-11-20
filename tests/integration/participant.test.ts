import supertest from 'supertest';
import httpStatus from 'http-status';
import { loadEnv } from '../../src/config/envs';
import { cleanDb } from '../helpers';
import {
  createParticipant,
  generateParticipantWithLowBalance,
  generateValidParticipant,
} from '../factories/participant-factory';
import app from '../../src/app';

const server = supertest(app);

beforeAll(async () => {
  await cleanDb();
});

beforeEach(async () => {
  loadEnv();
  await cleanDb();
});

describe('POST /participants', () => {
  it('should respond with status 409 when there is an participant with given name', async () => {
    const participant = await createParticipant();
    const response = generateValidParticipant(participant);
    const result = await server.post('/participants').send(response);
    expect(result.status).toBe(httpStatus.CONFLICT);
  });

  it('should respond with status 404 when the balance is less than 1000', async () => {
    const response = generateParticipantWithLowBalance();
    const result = await server.post('/participants').send(response);
    expect(result.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe('when body is valid', () => {
    it('should create a participant and return status code 200 OK', async () => {
      const response = generateValidParticipant();
      const result = await server.post('/participants').send(response);
      expect(result.status).toBe(httpStatus.CREATED);
      expect(result.body).toEqual({
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        name: response.name,
        balance: response.balance,
      });
    });
  });
});
