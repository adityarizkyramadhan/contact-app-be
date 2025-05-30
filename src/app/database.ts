import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";

export const prismaClient = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "info" },
    { emit: "event", level: "warn" },
    { emit: "event", level: "error" },
  ],
});

prismaClient.$on("query", (e: any) => {
  logger.info(e);
});

prismaClient.$on("info", (e: any) => {
  logger.info(e);
});

prismaClient.$on("warn", (e: any) => {
  logger.warn(e);
});

prismaClient.$on("error", (e: any) => {
  logger.error(e);
});
