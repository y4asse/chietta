import React from 'react'
import WrapContainer from '../layout/WrapContainer'
import CatAnimation from './CatAnimation'

const Hero = () => {
  return (
    <section className="bg-pink pb-10 pt-20 ">
      <WrapContainer>
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl text-center md:text-3xl font-bold w-full">
              明日を少しだけ良い日にする
              <br />
              新しい知識お届けします。
            </h1>
            <p className="mt-10 text-gray text-center text-xl">
              Chiettaはちょっとした隙間時間で新しい知識をお届けすることを目的として立ち上げられたサービスです。
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
