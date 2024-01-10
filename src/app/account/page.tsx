import React from "react";
import CreateAccountForm from "./components/CreateAccountForm";

function page() {
  return (
    <div className="grid place-items-center">
      <h2 className="inline-block text-lg font-bold border-b-4 border-green-500 pl-2 xs:text-xl 3xs:pb-1 3xs:text-2xl 3xs:border-b-4 md:text-3xl md:pl-4 md:pb-1">
        口座情報登録フォーム
      </h2>
      <CreateAccountForm className="my-5 3xs:my-8" />
    </div>
  );
}

export default page;
