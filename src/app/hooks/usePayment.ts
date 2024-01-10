import { createPaymentIntent, getSetupIntent } from "@/actions/usePayment";
import { PaymentIntent } from "@/types/payment";
import { useQuery } from "@tanstack/react-query";

export const useSetupIntent = () => {
  const queryKey = ["setupIntent"];

  const { data } = useQuery({
    queryKey,
    queryFn: async () => {
      return await getSetupIntent();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return { setupIntent: data };
};

export const usePaymentIntent = ({ amount }: PaymentIntent) => {
  const queryKey = ["paymentIntent"];

  const { data } = useQuery({
    queryKey,
    queryFn: async () => {
      return await createPaymentIntent({ amount });
    },
  });

  return { paymentIntent: data };
};
