import { Hono } from "hono";
import { logger } from "../app/logger";
import { RegisterUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";

export const userController = new Hono();

userController.post("/auth/register", async (c) => {
  try {
    logger.info("User registration request received");

    const request: RegisterUserRequest = await c.req.json();

    logger.info("Request body:", request);

    const result = await UserService.register(request);

    return c.json(
      {
        message: "User registered successfully",
        data: result,
      },
      201
    );
  } catch (error) {
    logger.error("Error in user registration:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});
