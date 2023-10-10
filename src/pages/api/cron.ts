import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../server/db";
import { ZennArticle, ZennResponse } from "types/zenn";
import { QiitaResponse } from "types/qiita";
import { env } from "~/env.mjs";
import { kv } from "~/server/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const zennUpdateCount = await updateZenn();
  const qiitaUpdateCount = await updateQiita();
  const totalUpdateCount = zennUpdateCount + qiitaUpdateCount;
  await updateRedis(totalUpdateCount);
  res.status(200).json({ zennUpdateCount, qiitaUpdateCount });
}

const updateRedis = async (updateCount: number) => {
  if (updateCount === 0) return;

  // dbから取得
  const newPosts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    take: updateCount,
  });

  // redisへ書き込み
  // 用意
  const pipeline = kv.pipeline();
  newPosts.map(async (post) => {
    pipeline.hset(`post:${post.id}`, {
      title: post.title,
      url: post.url,
      createdAt: post.createdAt,
      provider: post.provider,
    });
    pipeline.expire(`post:${post.id}`, 60 * 60 * 24 * 7);
  });

  // 実行
  const execStart = Date.now();
  const result = await pipeline.exec();
  const execEnd = Date.now();
  console.log(`redis exec time: ${execEnd - execStart}ms`);
  console.log(result);
  const overFlowCount = (await kv.zcard("timeline")) - 1000;
  if (overFlowCount > 0) {
    kv.zremrangebyrank("timeline", 0, overFlowCount - 1);
  }
};

const updateZenn = async () => {
  // zennから取得
  const res: ZennResponse = await fetch(
    `https://zenn.dev/api/articles?order=latest`,
  ).then((res) => res.json());

  // すべてinsertして、重複はスキップし、insertした数を返す
  const insertPosts = res.articles.map((article: ZennArticle) => ({
    url: "https://zenn.dev" + article.path,
    provider: "zenn",
    createdAt: new Date(article.published_at),
    title: article.title,
  }));

  // dbへ書き込み
  const { count } = await db.post.createMany({
    data: insertPosts,
    skipDuplicates: true,
  });
  return count;
};

const updateQiita = async () => {
  const apiKey = env.QIITA_API;
  const perPage = 50;
  const res: QiitaResponse = await fetch(
    `https://qiita.com/api/v2/items?per_page=${perPage}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    },
  ).then((res) => res.json());

  // すべてinsertして、重複はスキップし、insertした数を返す
  const insertPosts = res.map((article) => ({
    url: article.url,
    provider: "qiita",
    createdAt: new Date(article.created_at),
    title: article.title,
  }));

  // dbへ書き込み
  const { count } = await db.post.createMany({
    data: insertPosts,
    skipDuplicates: true,
  });
  return count;
};
