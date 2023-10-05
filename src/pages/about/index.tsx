import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Hero from "~/components/about/Hero";
import Works from "~/components/about/Works";
import Layout from "~/components/layout/layout";

import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cheeta | 明日をちょっと豊かにする知識</title>
        <meta
          name="description"
          content="明日をちょっとだけ豊かにする知識を提供します."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Hero />
        <Works />
      </Layout>
    </>
  );
}
