"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ChargeButton from "./components/ChargeButton";

function page() {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
  );
  return (
    <Elements
      stripe={stripePromise}
      options={{ mode: "payment", amount: 10, currency: "jpy" }}
    >
      <ChargeButton />
    </Elements>
  );
}

export default page;
