import supertest from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app';
import { loadEnv } from '../../src/config/envs';
import { cleanDb } from '../../tests/helpers';

const api = supertest(app);

describe('Integration Tests', () => {
  beforeAll(async () => {
    loadEnv();
    await cleanDb();
  });

  it("should return 200 and I'm ok!", async () => {
    const { text, status } = await api.get('/health');
    expect(status).toBe(httpStatus.OK);
    expect(text).toBe("I'm ok!");
  });
});
