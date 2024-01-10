import { NextAuthOptions } from "next-auth";
import prisma from "../prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Prismaを使うための設定
  adapter: PrismaAdapter(prisma),
  // 認証プロバイダーの設定
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  callbacks: {
    session: ({ session, token }) => {
      return { ...session, user: { ...session.user, id: token.sub } };
    },
  },
  // NEXTAUTH_SECRETの設定
  secret: process.env.NEXTAUTH_SECRET,
};
