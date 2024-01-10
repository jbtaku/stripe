import { fetcher } from "@/utils/fetcher";
import { ClientSecret } from "@/types/stripe";
import CashCard from "./components/CashCard";

async function page() {
  const setupIntent = await fetcher<ClientSecret>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/setup-intent`
  );

  if (!setupIntent || !setupIntent.clientSecret) return <p>loading</p>;
  return <CashCard/>
}

export default page;
