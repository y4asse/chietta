import React, { Touch, useCallback, useEffect, useRef, useState } from "react";
import WrapContainer from "~/components/layout/WrapContainer";
import Layout from "~/components/layout/layout";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { directionAtom, storyAtom } from "~/jotai/atoms";
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
import PageScroller from "~/components/trivia/PageScroller";

// TODO: LottieFilesをダイナミックインポート

const Trivia = ({ id }: { id: string }) => {
  const { data: trivia } = api.trivia.getById.useQuery(id);

  return (
    <Layout>
      <PageScroller>
        <Title trivia={trivia} />
        <Content trivia={trivia} />
      </PageScroller>
    </Layout>
  );
};

export default Trivia;

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
