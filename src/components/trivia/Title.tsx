import { AnimatePresence } from "framer-motion";
import React from "react";
import SlideAnimation from "../animation/SlideAnimation";
import WrapContainer from "../layout/WrapContainer";

const Title = ({
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
    <div className="bg-pink py-7">
      <AnimatePresence mode="wait">
        <SlideAnimation>
          <WrapContainer>
            {/* TODO: ここにプロフ */}
            <div className="flex items-center justify-center gap-5">
              <img
                src="/img/catBook.png"
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
  );
};

export default Title;