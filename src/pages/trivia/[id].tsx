import React, { Touch, useCallback, useEffect, useRef, useState } from "react";
import WrapContainer from "~/components/layout/WrapContainer";
import Layout from "~/components/layout/layout";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { directionAtom, historyAtom } from "~/jotai/atoms";
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
import Content from "~/components/trivia/Content";
import Title from "~/components/trivia/Title";
// import { kv } from "@vercel/kv";
// import Trpc from "../api/trpc/[trpc]";
// import { DehydratedState } from "@tanstack/react-query";

// TODO: LottieFilesをダイナミックインポート

// export const getServerSideProps = async ({
//   params,
// }: GetServerSidePropsContext) => {
//   const id = params!.id as string;
//   const helpers = createServerSideHelpers({
//     router: appRouter,
//     ctx: {
//       db: db,
//       session: null,
//     },
//     transformer: superjson,
//   });
//   //prefetchをすることによって、クライアント側でのクエリをキャッシュする
//   await helpers.trivia.getById.prefetch(id);
//   await helpers.trivia.getNextId.prefetch();
//   const nextId = await helpers.trivia.getNextId.fetch();
//   const trivia = await helpers.trivia.getById.fetch(id);
//   return {
//     props: {
//       trpcState: helpers.dehydrate(),
//       id,
//     },
//   };
// };

const Trivia = () =>
  // props: InferGetServerSidePropsType<typeof getServerSideProps>,
  {
    const router = useRouter();
    const id = router.query.id as string;
    const { data: trivia } = api.trivia.getById.useQuery(id);
    const { data: nextId, refetch } = api.trivia.getNextId.useQuery();
    const divRef = useRef<HTMLDivElement>(null);
    const [direction, setDirection] = useAtom(directionAtom);
    const [history, setHistory] = useAtom(historyAtom);
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
            const currentIndex = history.findIndex((hid) => hid === id);
            console.log(currentIndex);
            setDirection("forward");
            if (currentIndex === history.length - 1) {
              void router.push(`/trivia/${nextId}`);
            } else {
              void router.push(`/trivia/${history[currentIndex + 1]}`);
            }
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
      //現在見てるIDをhistoryに追加
      setHistory((prev) => {
        const isDuplicate = prev.includes(id);
        if (isDuplicate) return prev;
        return [...prev, id];
      });
      void refetch();
    }, [router.asPath]);

    useEffect(() => {
      if (!nextId) return;
      void router.prefetch(`/trivia/${nextId}`);
    }, [nextId]);

    return (
      <Layout>
        <div className="overflow-hidden" ref={divRef}>
          <Title trivia={trivia} />
          <Content trivia={trivia} />
        </div>
      </Layout>
    );
  };

export default Trivia;

// // TODO: ssgじゃなくてssrにして、ユーザのリクエストー＞Linkで次のページの遷移先もレンダリングする
export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>,
) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      db: db,
      session: null,
    },
    transformer: superjson,
  });
  if (context.params == undefined) {
    return { notFound: true };
  }

  const id = context.params.id;
  await helpers.trivia.getById.prefetch(id);
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const trivias = await db.trivia.findMany({
    select: {
      id: true,
    },
  });

  const paths = trivias.map((trivia) => ({
    params: {
      id: trivia.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
