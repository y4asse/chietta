import { Redis } from "@upstash/redis/nodejs";
import { env } from "~/env.mjs";

export const kv = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});
