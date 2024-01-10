"use client";

import React from "react";
import { Button } from "../ui/button";
import { getCsrfToken, signIn } from "next-auth/react";

interface Props {
  provider: string;
  icon: React.ReactNode;
}

function SignInButton({ provider, icon }: Props) {
  const handleSignIn = () => {
    signIn(provider);
  };
  return (
    <Button
      onClick={handleSignIn}
      size={"sm"}
      asChild
      className="shadow-md cursor-pointer bg-slate-950 hover:bg-slate-600"
    >
      <div className="flex space-x-2 mx-auto py-5">
        {icon}
        <p className="text-base font-bold">Sign in with {provider}</p>
      </div>
    </Button>
  );
}

export default SignInButton;
