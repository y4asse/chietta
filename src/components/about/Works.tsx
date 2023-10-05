import React from "react";
import WrapContainer from "../layout/WrapContainer";

const Works = () => {
  return (
    <section className="bg-[white] pt-10">
      <WrapContainer>
        <h2 className="text-center text-2xl font-bold">知識の探求</h2>
        <p className="mt-5 text-gray">
          知識の本をめくり、ページを切り取ることであなただけの本を作ることができます。知識は無限大です。
        </p>
        <img
          src="/img/catBook.png"
          alt="猫の画像"
          className="mx-auto h-[200px]"
        />
      </WrapContainer>
    </section>
  );
};

export default Works;
