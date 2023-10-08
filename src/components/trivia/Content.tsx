import { AnimatePresence } from "framer-motion";
import React from "react";
import SlideAnimation from "../animation/SlideAnimation";
import WrapContainer from "../layout/WrapContainer";

const Content = ({
  trivia,
}: {
  trivia:
    | {
        id: string;
        title: string;
        content: string;
        detail: string | null;
        createdAt: Date;
        updatedAt: Date;
      }
    | null
    | undefined;
}) => {
  return (
    <AnimatePresence>
      <WrapContainer>
        <p className="pt-10 text-lg">{trivia?.content}</p>
        <p className="mt-10 text-center text-gray">
          さらに知りたいですか？
          <br />
          賢者に尋ねてみましょう。
        </p>
        <div className="my-5 text-center">
          <button className="rounded bg-primary px-5 py-2 text-xl font-bold text-[white]">
            もっと詳しく
          </button>
        </div>
        <img
          src="/img/catBook.png"
          alt="画像"
          width={200}
          className="mx-auto mt-3"
        />
      </WrapContainer>
    </AnimatePresence>
  );
};

export default Content;
