import { z, ZodType } from "zod";

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(8).max(16),
    password: z.string().min(8).max(32),
    name: z.string().min(3).max(50),
  });

  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(8).max(16),
    password: z.string().min(8).max(32),
  });
}
