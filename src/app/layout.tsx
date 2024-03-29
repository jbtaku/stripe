import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import Header from "@/components/layout/Header";
import { dehydratedState } from "@/lib/react-query/dehydratedState";
import { fetcher } from "@/utils/fetcher";
import { ClientSecret } from "@/types/stripe";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "stripe-test",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setupIntent = await fetcher<ClientSecret>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/setup-intent`
  );
  return (
    <html lang="ja">
      <body className={`${inter.className} text-slate-700 bg-slate-100`}>
        <div className="w-[92%] max-w-[1024px] mx-auto mt-3 xs:mt-7 xs:w-[88%] sm:mt-9">
          <Provider clientSecret={setupIntent.clientSecret}>
            <Header />
            <div className="mt-12">{children}</div>
          </Provider>
        </div>
      </body>
    </html>
  );
}
