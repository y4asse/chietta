import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "~/components/layout/layout";
import { appRouter } from "~/server/api/root";
import { db } from "~/server/db";

import { api } from "~/utils/api";

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      db: db,
      session: null,
    },
  });
  //prefetchをすることによって、クライアント側でのクエリをキャッシュする
  await helpers.trivia.getNextId.prefetch();
  return {
    props: {
      trpcState: helpers.dehydrate(),
      nextId: await helpers.trivia.getNextId.fetch(),
    },
  };
};

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { nextId } = props;
  return (
    <>
      <Head>
        <title>Chietta | 明日を少しだけ良い日にする知識</title>
        <meta
          name="description"
          content="ちょっとした隙間時間で、新しい知識の1ページをお届けするサービスです。Web上で気軽に読めて、明日のあなたを今日よりすこし賢くします"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="mt-10 text-center text-4xl">トップ</h1>
        <div className="my-10 text-center">
          <Link
            href={`/trivia/${nextId}`}
            className="rounded bg-primary p-3 text-[white]"
          >
            さっそく始める
          </Link>
          {nextId}
        </div>
      </Layout>
    </>
  );
}
