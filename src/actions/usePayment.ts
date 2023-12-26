"use server";

import { stripe } from "../lib/stripe/stripe";
import { PaymentIntent } from "@/types/payment";
import { TEST_USER } from "@/app/const/testUser";

export const getSetupIntent = async () => {
  try {
    const { data } = await stripe.customers.search({
      query: `metadata["userId"]:"${TEST_USER.id}"`,
    });

    let customerId;

    if (data.length === 0) {
      const customer = await stripe.customers.create({
        name: TEST_USER.name as string,
        email: TEST_USER.email as string,
        metadata: {
          userId: TEST_USER.id as string,
        },
      });
      customerId = customer.id;
    } else {
      customerId = data[0].id;
    }

    const setupIntents = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ['card']
    });

    return {
      clientSecret: setupIntents.client_secret as string,
    };
  } catch (e) {
    console.log(e);
  }
};

export const createPaymentIntent = async ({
  amount,
}: PaymentIntent) => {
  try {
    const { data } = await stripe.customers.search({
      query: `metadata["userId"]:"${TEST_USER.id}"`,
    });
    await stripe.paymentIntents.create({
      amount,
      currency: "jpy",
      customer: data[0].id,
    });
  } catch (e) {
    console.log(e);
  }
};

export const createAccount = async (idempotencyKey: string) => {
  try {
    const a = await stripe.accounts.create(
      {
        type: "custom",
        country: "JP",
        business_type: "individual",
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      },
      {
        idempotencyKey,
      }
    );
  } catch (e) {
    console.log(e);
  }
};

export const updateAccount = async () => {
  try {
    await stripe.accounts.update("", {
      individual: { verification: { document: { front: "", back: "" } } },
      tos_acceptance: { date: 1 },
    });
  } catch (e) {}
};
