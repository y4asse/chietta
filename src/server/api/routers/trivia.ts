import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const triviaRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.db.trivia.findUnique({
      where: { id: input },
    });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.trivia.findMany();
  }),

  // getSession: publicProcedure.query(async ({ ctx }) => {
  //   await kv.set("guest_aaaafdsafkfasdf", ["id1", "id2"]);
  //   const session = await kv.get("user_1_session");
  //   return session as string[];
  // }),

  insertMany: publicProcedure
    .input(
      z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          detail: z.string().nullable(),
          categories: z.array(z.string()),
        }),
      ),
    )
    .mutation(({ ctx, input }) => {
      return input.map(async ({ title, content, detail, categories }) => {
        return await ctx.db.trivia.create({
          data: {
            title: title,
            content: content,
            detail: detail,
            categories: {
              create: categories.map((value, index) => ({
                category: {
                  connectOrCreate: {
                    where: { name: value },
                    create: { name: value },
                  },
                },
              })),
            },
          },
        });
      });
    }),

  getNextId: publicProcedure.query(async ({ ctx }) => {
    const time = new Date().getTime();
    const trivias = await ctx.db.trivia.findMany({ select: { id: true } });
    console.log("exec time", new Date().getTime() - time);
    if (trivias.length < 1) return null;
    const randomIndex = Math.floor(Math.random() * trivias.length);
    return trivias[randomIndex]!.id;
  }),

  getManyIds: publicProcedure.query(async ({ ctx }) => {
    //視聴履歴にないものから選ぶ
    const history = [""];
    const trivias = await ctx.db.trivia.findMany({
      where: { id: { notIn: history } },
    });
    const ids = trivias.map((t) => t.id);
    return ids;
  }),

  setHistory: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    // TODO ここでKVに保存する
    const id = input;
    return "success";
  }),
});
