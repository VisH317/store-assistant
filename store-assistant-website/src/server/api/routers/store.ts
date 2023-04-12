import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { CreateStoreData } from "./types";

export const exampleRouter = createTRPCRouter({
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),
//   getAll: publicProcedure.query(({ ctx }) => {
//     return ctx.prisma.example.findMany();
//   }),
    createStore: publicProcedure   
        .input(CreateStoreData)
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.store.create({ data: input })
        }),
    getStores: publicProcedure
        .input(Number)
        .query(({ input, ctx }) => {
            const allStores = ctx.prisma.store.findMany({
                where: {
                    userId: input
                }
            })
            return allStores
        })
});
