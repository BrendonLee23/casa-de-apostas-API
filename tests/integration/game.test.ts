import supertest from "supertest";
import { cleanDb } from "../helpers";
import app from "@/app";

beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

