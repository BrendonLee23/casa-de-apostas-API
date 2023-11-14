import supertest from "supertest";
import { cleanDb } from "../helpers";
import app from "../../src/app";

beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

