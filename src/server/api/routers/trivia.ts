import { kv } from "@vercel/kv";
import { title } from "process";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const triviaRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.db.trivia.findUnique({
      where: { id: input },
    });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.trivia.findMany();
  }),

  getSession: publicProcedure.query(async ({ ctx }) => {
    await kv.set("guest_aaaafdsafkfasdf", ["id1", "id2"]);
    const session = await kv.get("user_1_session");
    return session as string[];
  }),

  insertMany: publicProcedure
    .input(
      z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          detail: z.string().nullable(),
        }),
      ),
    )
    .mutation(({ ctx, input }) => {
      const trivias = ctx.db.trivia.createMany({
        data: input,
        skipDuplicates: true,
      });

      return trivias;
    }),
  getNextId: publicProcedure.query(async ({ ctx }) => {
    const trivias = await ctx.db.trivia.findMany({ select: { id: true } });
    const randomIndex = Math.floor(Math.random() * trivias.length);
    return trivias[randomIndex]!.id;
  }),
});
