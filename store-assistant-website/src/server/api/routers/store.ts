import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ChangeStorePromptData, CreateStoreData } from "./types";

export const storeRouter = createTRPCRouter({
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
        .input(String)
        .query(async ({ input, ctx }) => {
            const allStores = await ctx.prisma.store.findMany({
                where: { userid: input }
            })
            return allStores
        }),
    changeStorePrompt: publicProcedure
        .input(String)
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.store.updateMany({
                data: { prompt: input }
            })
        }),
    deleteStore: publicProcedure
        .input(String)
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.store.delete({
                where: { id: input }
            })
        })
});
