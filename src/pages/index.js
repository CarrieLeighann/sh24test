import Head from "next/head";
import { PostcodeChecker } from "@/components/PostcodeChecker";

export default function Home() {
  return (
    <>
      <Head>
        <title>Postcode Checker</title>
        <meta name="Postcode Checker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
       <PostcodeChecker />     
      </div>
    </>
  );
}
