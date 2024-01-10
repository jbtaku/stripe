import { DefaultSession } from "next-auth";
import "next-auth/jwt";
export interface AuthOptions {
  id: string;
}

declare module "next-auth" {
  interface Session {
    user: AuthOptions & DefaultSession["user"];
  }
}