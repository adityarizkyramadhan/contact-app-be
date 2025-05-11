import { prismaClient } from "../app/database";
import {
  LoginUserRequest,
  RegisterUserRequest,
  toUserResponse,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { HTTPException } from "hono/http-exception";

export class UserService {
  static async register(request: RegisterUserRequest): Promise<UserResponse> {
    request = UserValidation.REGISTER.parse(request);

    const isExist = await prismaClient.user.count({
      where: {
        username: request.username,
      },
    });
    if (isExist > 0) {
      throw new HTTPException(400, {
        message: "Username already exists",
        cause: "UserService.register",
      });
    }
    request.password = await Bun.password.hash(request.password, {
      algorithm: "bcrypt",
      cost: 10,
    });

    const user = await prismaClient.user.create({
      data: {
        username: request.username,
        password: request.password,
        name: request.name,
        token: null,
      },
    });
    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    request = UserValidation.LOGIN.parse(request);

    const user = await prismaClient.user.findUnique({
      where: {
        username: request.username,
      },
    });
    if (!user) {
      throw new HTTPException(400, {
        message: "Invalid username or password",
        cause: "UserService.login",
      });
    }

    const isValidPassword = await Bun.password.verify(
      request.password,
      user.password
    );
    if (!isValidPassword) {
      throw new HTTPException(400, {
        message: "Invalid username or password",
        cause: "UserService.login",
      });
    }

    return toUserResponse(user);
  }
}
