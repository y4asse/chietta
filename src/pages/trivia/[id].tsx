import React, { Touch, useCallback, useEffect, useRef, useState } from "react";
import WrapContainer from "~/components/layout/WrapContainer";
import Layout from "~/components/layout/layout";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { directionAtom } from "~/jotai/atoms";
import { AnimatePresence } from "framer-motion";
import SlideAnimation from "~/components/animation/SlideAnimation";
import { api } from "~/utils/api";
import NotFound from "../404";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import next, {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { db } from "~/server/db";
import { appRouter } from "~/server/api/root";
import { kv } from "@vercel/kv";
import Trpc from "../api/trpc/[trpc]";
import { DehydratedState } from "@tanstack/react-query";

// TODO: LottieFilesをダイナミックインポート

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const id = params!.id as string;
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      db: db,
      session: null,
    },
    transformer: superjson,
  });
  //prefetchをすることによって、クライアント側でのクエリをキャッシュする
  await helpers.trivia.getById.prefetch(id);
  await helpers.trivia.getNextId.prefetch();
  const nextId = await helpers.trivia.getNextId.fetch();
  const trivia = await helpers.trivia.getById.fetch(id);
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};

const Trivia = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { id } = props;
  const { data: trivia } = api.trivia.getById.useQuery(id);
  const { data: nextId } = api.trivia.getNextId.useQuery();
  const router = useRouter();
  const divRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useAtom(directionAtom);
  const clickHandler = useCallback(
    (e: MouseEvent) => {
      if (!divRef.current) return;
      // 高さ
      if (
        e.clientY >= divRef.current.getBoundingClientRect().top &&
        e.clientY <= divRef.current.getBoundingClientRect().bottom
      ) {
        if (e.clientX < window.innerWidth / 4) {
          setDirection("backward");
          router.back();
        } else if (e.clientX > (window.innerWidth * 3) / 4) {
          if (!nextId) return;
          setDirection("forward");
          void router.push(`/trivia/${nextId}`);
        }
      }
    },
    [nextId],
  );
  useEffect(() => {
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [clickHandler]);

  useEffect(() => {
    void router.prefetch(`/trivia/${nextId}`);
  }, [nextId]);

  return (
    <Layout>
      <div className="overflow-hidden" ref={divRef}>
        <div className="bg-pink py-7">
          <AnimatePresence mode="wait">
            <SlideAnimation>
              <WrapContainer>
                {/* TODO: ここにプロフ */}
                <div className="flex items-center justify-center gap-5">
                  <img
                    src="/img/cat.png"
                    alt="アイコン"
                    className="h-[38px] w-[38px] rounded-full"
                  />
                  <p className="text-center text-gray">雑学の本</p>
                </div>
                <h1 className="mt-3 text-center text-2xl font-bold">
                  {trivia?.title}
                </h1>
              </WrapContainer>
            </SlideAnimation>
          </AnimatePresence>
        </div>
        <AnimatePresence>
          <SlideAnimation>
            <WrapContainer>
              <p className="pt-10 text-lg">{trivia?.content}</p>
              <p className="mt-10 text-center text-gray">
                さらに知りたいですか？
                <br />
                賢者に尋ねてみましょう。
              </p>
              <div className="mb-20 mt-5 text-center">
                <button className="rounded bg-primary px-5 py-2 text-xl font-bold text-[white]">
                  もっと詳しく
                </button>
              </div>
              <img
                src="/img/cat.png"
                alt="画像"
                width={200}
                className="mx-auto mt-3"
              />
            </WrapContainer>
          </SlideAnimation>
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Trivia;

// // TODO: ssgじゃなくてssrにして、ユーザのリクエストー＞Linkで次のページの遷移先もレンダリングする
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ id: string }>,
// ) => {
//   const helpers = createServerSideHelpers({
//     router: appRouter,
//     ctx: {
//       db: db,
//       session: null,
//     },
//     transformer: superjson,
//   });
//   if (context.params == undefined) {
//     return { notFound: true };
//   }

//   const id = context.params.id;
//   await helpers.trivia.getById.prefetch(id);
//   return {
//     props: {
//       trpcState: helpers.dehydrate(),
//       id,
//     },
//   };
// };
