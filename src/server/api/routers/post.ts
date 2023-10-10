import { Post } from "@prisma/client";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  // redisから取得
  getPosts: publicProcedure.query(async ({ ctx }) => {
    const { kv } = ctx;
    const take = 20;
    const startTimeline = Date.now();
    const timeline: string[] = await kv.zrange("timeline", 0, take - 1);
    const posts = await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      take,
    });
    const endTimeline = Date.now();
    console.log(
      "[getPosts] get timeline = " + (endTimeline - startTimeline) + "ms",
    );
    // if (timeline.length === 0) return [];
    // const pipeline = kv.pipeline();
    // timeline.map((id) => {
    //   pipeline.hgetall(`post:${id}`);
    // });
    // const startExec = Date.now();

    // const result: {
    //   title: string;
    //   url: string;
    //   createdAt: string;
    //   provider: string;
    // }[] = await pipeline.exec();
    // const endExec = Date.now();
    // console.log("[getPosts] exec = " + (endExec - startExec) + "ms");
    // const posts = result.map((post, i) => ({
    //   ...post,
    //   id: timeline[i]!,
    //   createdAt: new Date(post.createdAt),
    // }));

    return posts as Post[];
  }),
});
