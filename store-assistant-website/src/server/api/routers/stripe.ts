import { getOrCreateStripeCustomerIdForUser } from "~/server/stripe/stripe-webhook-handlers"
import { createTRPCRouter, publicProcedure } from "../trpc"
import { env } from "~/env.mjs"

export const stripeRouter = createTRPCRouter({
    createCheckoutSession: publicProcedure.mutation(async ({ ctx }) => {
        const { stripe, prisma, supabase } = ctx
        const user = await supabase.auth.getUser()
        const userid = user.data.user?.id

        const customerId = await getOrCreateStripeCustomerIdForUser({ prisma, stripe, userId: user.data.user?.id as string })

        const baseUrl = `http://${"localhost:3000"}`

        const checkoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            client_reference_id: userid,
            payment_method_types: ["card"],
            mode: "subscription",
            line_items: [
                {
                    price: env.STRIPE_PRICE_ID,
                    quantity: 1,
                },
            ],
            success_url: `${baseUrl}/dashboard?checkoutSuccess=true`,
            cancel_url: `${baseUrl}/dashboard?checkoutCanceled=true`,
            subscription_data: {
                metadata: {
                    userId: userid as string,
                },
            },
        });
    
        if (!checkoutSession) {
            throw new Error("Could not create checkout session");
        }
    
        return { checkoutUrl: checkoutSession.url };
    }),
    createBillingPortalSession: publicProcedure.mutation(async ({ ctx }) => {
        const { stripe, supabase, prisma } = ctx;

        const user = await supabase.auth.getUser()

        const customerId = await getOrCreateStripeCustomerIdForUser({
            prisma,
            stripe,
            userId: user.data.user?.id as string,
        });

        if (!customerId) {
        throw new Error("Could not create customer");
        }

        const baseUrl =
        env.NODE_ENV === `http://${"localhost:3000"}`

        const stripeBillingPortalSession =
        await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${baseUrl}/dashboard`,
        });

        if (!stripeBillingPortalSession) {
        throw new Error("Could not create billing portal session");
        }

        return { billingPortalUrl: stripeBillingPortalSession.url };
    })
})