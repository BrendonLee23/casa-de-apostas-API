
import supertest from "supertest";
import { cleanDb } from "../helpers";
import app from "desafio-tecnico-API/src/app";

beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

describe('POST /bets', () => {
    it('should return')
});