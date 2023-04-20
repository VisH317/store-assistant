import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ChangeStorePromptData, CreateOnlineStoreData, CreateStoreData } from "./types";

export const onlineStoreRouter = createTRPCRouter({
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
        .input(CreateOnlineStoreData)
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.onlineStore.create({ data: input })
        }),
    getStores: publicProcedure
        .input(String)
        .query(async ({ input, ctx }) => {
            const allStores = await ctx.prisma.onlineStore.findMany({
                where: { userid: input }
            })
            return allStores
        }),
    changeStorePrompt: publicProcedure
        .input(ChangeStorePromptData)
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.onlineStore.update({
                data: { prompt: input.prompt },
                where: { id: input.id }
            })
        }),
    deleteStore: publicProcedure
        .input(String)
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.onlineStore.delete({
                where: { id: input }
            })
        })
});