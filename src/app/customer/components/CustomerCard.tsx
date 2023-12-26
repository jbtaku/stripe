import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent } from "react";

function CustomerCard() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    const { paymentMethod } = await stripe.createPaymentMethod({ elements });
    await stripe.confirmSetup({
      elements,
      redirect: "if_required",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CustomerCard;
