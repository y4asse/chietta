import React, { Touch, useEffect, useRef, useState } from "react";
import WrapContainer from "~/components/layout/WrapContainer";
import Layout from "~/components/layout/layout";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { directionAtom } from "~/jotai/atoms";
import { AnimatePresence } from "framer-motion";
import SlideAnimation from "~/components/animation/SlideAnimation";
import { api } from "~/utils/api";
import NotFound from "../404";
// TODO: LottieFilesをダイナミックインポート

const Trivia = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [direction, setDirection] = useAtom(directionAtom);
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
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
          setDirection("forward");
          void router.push(`/trivia/${Math.random()}`);
        }
      }
    };
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  const divRef = useRef<HTMLDivElement>(null);
  const { data: trivia } = api.trivia.getById.useQuery(id);
  if (!trivia) {
    return <NotFound />;
  }

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
                  {trivia.title}
                </h1>
              </WrapContainer>
            </SlideAnimation>
          </AnimatePresence>
        </div>
        <AnimatePresence>
          <SlideAnimation>
            <WrapContainer>
              <img
                src="/img/cat.png"
                alt="画像"
                width={200}
                className="mx-auto mt-3"
              />
              <p className="pt-10 text-lg">{trivia.content}</p>
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
            </WrapContainer>
          </SlideAnimation>
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Trivia;
