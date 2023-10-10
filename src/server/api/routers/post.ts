import { Post } from "@prisma/client";
import { Redis } from "@upstash/redis/nodejs";
import { env } from "~/env.mjs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  // redisから取得
  getPosts: publicProcedure.query(async ({ ctx }) => {
    const { kv } = ctx;
    const startTimeline = Date.now();
    const timeline: string[] = await kv.zrange("timeline", 0, 50);
    const endTimeline = Date.now();
    console.log(
      "[getPosts] get timeline = " + (endTimeline - startTimeline) + "ms",
    );
    // const timeline = await ctx.db.post.findMany({
    //   orderBy: { createdAt: "desc" },
    //   take: 50,
    // });
    const pipeline = kv.pipeline();
    //降順に並び替え
    for (let i = timeline.length - 1; i >= 0; i--) {
      pipeline.hgetall(`post:${timeline[i]}`);
    }
    const startExec = Date.now();
    const result: {
      title: string;
      url: string;
      createdAt: string;
      provider: string;
    }[] = await pipeline.exec();
    const endExec = Date.now();
    console.log("[getPosts] exec = " + (endExec - startExec) + "ms");
    const posts = result.map((post, i) => ({
      ...post,
      id: timeline[i]!,
      createdAt: new Date(post.createdAt),
    }));

    return posts as Post[];
  }),
});
