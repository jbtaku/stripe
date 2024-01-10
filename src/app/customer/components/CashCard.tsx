"use client"

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent } from "react";

function CashCard() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    await stripe.confirmSetup({
      elements,
      redirect: "if_required",
    });
  };
  if (!stripe || !elements) return <p>aaa</p>
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CashCard;
