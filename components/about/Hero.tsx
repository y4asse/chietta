import React from 'react'
import WrapContainer from '../layout/WrapContainer'
import CatAnimation from './CatAnimation'

const Hero = () => {
  return (
    <section className="bg-pink pb-10 pt-20 px-3">
      <WrapContainer>
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl text-center md:text-3xl font-bold w-full">
              ちょっとした隙間時間に読む
              <br />
              記事をお届けします。
            </h1>
            <p className="mt-10 text-gray text-center text-xl">
              Chiettaはちょっとした隙間時間に読むための記事をお届けすることを目的として立ち上げられたサービスです。
            </p>
          </div>
          <div className="w-full md:w-1/2">
            {/* <Image src="/img/catBook.png" alt="猫の画像" className="mx-auto md:w-[300px]" height={200} width={200} /> */}
            <CatAnimation />
          </div>
        </div>
      </WrapContainer>
    </section>
  )
}

export default Hero
