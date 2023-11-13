import app from "@/app";
import supertest from "supertest";
import { cleanDb } from "../helpers";

beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

