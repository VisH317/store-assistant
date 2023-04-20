import { PrismaClient } from '@prisma/client'
import type Stripe from "stripe"
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { env } from '~/env.mjs';

export const getOrCreateStripeCustomerIdForUser = async ({
    stripe,
    prisma,
    userId,
}: {
    stripe: Stripe;
    prisma: PrismaClient;
    userId: string;
}) => {
    const supabase: SupabaseClient = createClient(env.SUPABASE_URL, env.SUPABASE_ANON)
    const user = await supabase.auth.getUser()
    const customer = await prisma.user.findUnique({
        where: { id: user.data.user?.id }
    })

    if(customer.customerId) return customer.customerId

    const newCustomer = await stripe.customers.create({
        email: user.data.user?.email as string,
        metadata: {
            userId: user.data.user?.id as string
        }
    })

    const updatedUser = await prisma.user.create({
        data: {
            userid: user.data.user?.id,
            customerId: newCustomer.id
        }
    })

    return updatedUser.customerId
}

export const handleInvoicePaid = async ({ event, stripe, prisma }: { event: Stripe.Event, stripe: Stripe, prisma: PrismaClient }) => {
    const invoice = event.data.object as Stripe.Invoice;
    const subscriptionId = invoice.subscription;
    const subscription = await stripe.subscriptions.retrieve(
        subscriptionId as string
    );
    const userId = subscription.metadata.userId;

    await prisma.user.update({
        where: {
            userid: userId,
        },
        data: {
            stripeSubscriptionId: subscription.id,
            stripeSubscriptionStatus: subscription.status,
        },
    });
}

export const handleSubscriptionCreatedOrUpdated = async ({
    event,
    prisma,
}: {
    event: Stripe.Event;
    prisma: PrismaClient;
}) => {
    const subscription = event.data.object as Stripe.Subscription;
    const userId = subscription.metadata.userId;

    // update user with subscription data
    await prisma.user.update({
        where: {
            userid: userId,
        },
        data: {
            stripeSubscriptionId: subscription.id,
            stripeSubscriptionStatus: subscription.status,
        },
    });
};

export const handleSubscriptionCanceled = async ({
    event,
    prisma,
}: {
    event: Stripe.Event;
    prisma: PrismaClient;
}) => {
    const subscription = event.data.object as Stripe.Subscription;
    const userId = subscription.metadata.userId;

    // remove subscription data from user
    await prisma.user.update({
    where: {
        id: userId,
    },
    data: {
        stripeSubscriptionId: null,
        stripeSubscriptionStatus: null,
    },
    });
};