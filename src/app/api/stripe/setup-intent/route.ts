import { TEST_USER } from "@/app/const/testUser";
import { stripe } from "@/lib/stripe/stripe";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
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
      payment_method_types: ["card"],
    });

    const clientSecret = {
      clientSecret: setupIntents.client_secret as string,
    };

    return NextResponse.json(clientSecret);
  } catch (e) {
    console.log(e);
    return NextResponse.json(null);
  }
};
