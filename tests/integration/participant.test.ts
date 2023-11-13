import app from "@/app";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import { createParticipant } from "../factories/participant-factory";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";

const server = supertest(app);

beforeEach(async () => {
    await cleanDb();
});

describe("News API Tests", () => {
    it("should return 200 on health status", async () => {
        const result = await server.get("/health");
        expect(result.status).toBe(200);
    });
});

describe('POST /participants', () => {
    it('should create a participant and return status code 200 OK', async () => {
        const participant = createParticipant()
        const result = await server.post('/participants').send(participant)
        expect(result.status).toBe(httpStatus.OK);
        expect(result.body).toEqual({
            id: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            name: faker.person.firstName(),
            balance: faker.number.int(),
        })
    });
});
