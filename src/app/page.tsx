import Link from "next/link";

async function page() {
  return (
    <div className="[&>div]:flex [&>div]:space-x-4 [&>div]:my-1 [&_p]:text-green-500 text-xl">
      <h1 className="text-4xl font-bold mb-6">リンク集</h1>
      <div>
        <Link href={"/customer"}>customer</Link>
        <p>//顧客を作成</p>
      </div>
      <div>
        <Link href={"/account"}>account</Link>
        <p>//子アカウントを作成</p>
      </div>
      <div>
        <Link href={"/request"}>request</Link>
        <p>//顧客からvtuberにリクエスト</p>
      </div>
      <div>
        <Link href={"/charge"}>charge</Link>
        <p>//リクエストを承認（決済完了）</p>
      </div>
      <div>
        <Link href={"/transfer"}>transfer</Link>
        <p>//子アカウントに送金</p>
      </div>
    </div>
  );
}

export default page;
