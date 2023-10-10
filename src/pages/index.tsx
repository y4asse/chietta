import Head from "next/head";
import Layout from "~/components/layout/layout";
import PostItem from "~/components/tech/PostItem";
import { trpc } from "~/utils/trpc";
import { Post } from "@prisma/client";
export type OGP = {
  title: string;
  image: string;
};

export type PostOgp = {
  post: Post;
  ogp: OGP;
};

export default function Home() {
  const { data: posts, status } = trpc.post.getPostsFromDb.useQuery(undefined, {
    staleTime: 1000 * 60 * 5, // 5分間キャッシュ
    cacheTime: 1000 * 60 * 5, // 5分間キャッシュ
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
