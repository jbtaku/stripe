"use client";

import { Children } from "@/types/common";
import { SessionProvider } from "next-auth/react";
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ClientSecret } from "@/types/stripe";

interface Props extends Children, ClientSecret {}

function Provider({ children, clientSecret }: Props) {
  const queryClient = new QueryClient();
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Elements
          stripe={stripePromise}
          options={{
            appearance: {
              theme: "stripe",
            },
            clientSecret: clientSecret,
          }}
        >
          {children}
        </Elements>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default Provider;
