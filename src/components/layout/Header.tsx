"use client";

import { useUserInfo } from "@/hooks/useUserInfo";
import { Skeleton } from "../ui/skeleton";
import SignInButton from "../custom-ui/SignInButton";
import SignOutButton from "../custom-ui/SignOutButton";

function Header() {
  const { userInfo, isPending } = useUserInfo();

  return (
    <header className="flex">
      <h1 className="text-6xl font-bold">Stripe Test</h1>
      <div className="ml-auto">
        {isPending ? (
          <Skeleton className="w-32 h-10 rounded-full bg-gradient-to-r from-slate-200 to-slate-300/80" />
        ) : userInfo ? (
          <SignOutButton />
        ) : (
          <SignInButton provider="google" icon />
        )}
      </div>
    </header>
  );
}

export default Header;
