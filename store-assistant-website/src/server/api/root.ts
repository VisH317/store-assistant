import { createTRPCRouter } from "~/server/api/trpc";
import { storeRouter } from "~/server/api/routers/store";
import { onlineStoreRouter } from "./routers/onlineStore";
import { stripeRouter } from "./routers/stripe";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  store: storeRouter,
  onlineStore: onlineStoreRouter,
  stripe: stripeRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
