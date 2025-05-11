import { User } from "@prisma/client";

export type RegisterUserRequest = {
  username: string;
  password: string;
  name: string;
};

export type UserResponse = {
  id: number;
  username: string;
  name: string;
  token?: string;
  created_at: Date;
  updated_at: Date;
};

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    token: user?.token ?? undefined,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}
