"use client";

import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";

function SignOutButton() {
  return (
    <div className="w-max ml-auto">
      <Button onClick={() => signOut()}>サインアウト</Button>
    </div>
  );
}

export default SignOutButton;
