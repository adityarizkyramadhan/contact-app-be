import { it, describe, expect, afterAll, beforeAll } from "bun:test";
import app from "../src";
import { logger } from "../src/app/logger";
import { prismaClient } from "../src/app/database";

beforeAll(async () => {
  logger.info("Setting up test database...");
  await prismaClient.user.deleteMany({
    where: {},
  });
});

afterAll(async () => {
  logger.info("Cleaning up test database...");
  await prismaClient.user.deleteMany({
    where: {},
  });
});

describe("POST register user", () => {
  it("should register a user", async () => {
    const response = await app.request("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: new Blob([
        JSON.stringify({
          username: "testuser",
          password: "testpassword",
          name: "Test User",
        }),
      ]),
    });

    const data = await response.json();
    logger.debug("Response data:", data);
    expect(response.status).toBe(201);
  });
});

describe("POST login user", () => {
  it("should login a user", async () => {
    const response = await app.request("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: new Blob([
        JSON.stringify({
          username: "testuser",
          password: "testpassword",
        }),
      ]),
    });

    const data = await response.json();
    logger.debug("Response data:", data);
    expect(response.status).toBe(200);
  });
});
