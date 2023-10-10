import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Layout from "~/components/layout/layout";
import PostItem from "~/components/tech/PostItem";
import { appRouter } from "~/server/api/root";
import { db } from "~/server/db";
import { trpc } from "~/utils/trpc";
import { Post } from "@prisma/client";
import { Redis } from "@upstash/redis/nodejs";
import { env } from "~/env.mjs";

export const getServerSideProps = ({ params }: GetServerSidePropsContext) => {
  const kv = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  });
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      db: db,
      session: null,
      kv: kv,
    },
  });
  // await helpers.post.getPosts.prefetch();
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
};
export type OGP = {
  title: string;
  image: string;
};

export type PostOgp = {
  post: Post;
  ogp: OGP;
};

export default function Home() {
  const { data: posts, status } = trpc.post.getPosts.useQuery(undefined, {
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60,
  });

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
        <div className="bg-pink p-10">
          <h1 className=" bg-pink text-center text-3xl font-bold">新着</h1>
        </div>
        <div className="grid grid-cols-1 text-center shadow-lg">
          {posts?.map((post) => <PostItem post={post} key={post.id} />)}
          <button className="border">もっと</button>
        </div>
      </Layout>
    </>
  );
}
