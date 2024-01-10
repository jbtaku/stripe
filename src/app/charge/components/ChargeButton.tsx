"use client";

import React from "react";
import { PaymentIntent } from "@/types/payment";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "@/actions/usePayment";

function ChargeButton() {
  const stripe = useStripe();
  const elements = useElements();

  const dummy: PaymentIntent = {
    amount: 500,
  };

  const handleClick = async () => {
    console.log("stripe", stripe);
    console.log("elements", elements);
    if (!stripe || !elements) return null;
    createPaymentIntent(dummy)
  };

  return (
    <div>
      <button onClick={handleClick}>button</button>
    </div>
  );
}
export default ChargeButton;
