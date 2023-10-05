import React from "react";
import WrapContainer from "../layout/WrapContainer";

const Hero = () => {
  return (
    <section className="bg-pink pb-10 pt-20">
      <WrapContainer>
        <h1 className="text-center text-2xl font-bold">
          明日を少しだけ良い日にする
          <br />
          新しい知識の1ページを。
        </h1>
        <p className="mt-5 text-gray">
          Cheetaはちょっとした隙間時間で新しい知識の1ページをお届けすることを目的として立ち上げられたサービスです。
        </p>
        <img
          src="/img/catBook.png"
          alt="猫の画像"
          className="mx-auto h-[200px]"
        />
        <p className="mt-5 text-gray">
          世界はまだ私たちが知らないことであふれています。明日のあなたが今日より少しでもこの世界を楽しめますように。
        </p>
      </WrapContainer>
    </section>
  );
};

export default Hero;
