import { it, describe, expect } from "bun:test";
import app from "../src";
import { logger } from "../src/app/logger";

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
