import React from 'react'
import WrapContainer from '../layout/WrapContainer'
import Image from 'next/image'

const Works = () => {
  return (
    <section className="bg-white dark:bg-lightDark pb-10 pt-20 text-xl dark:text-white">
      <WrapContainer>
        <section className="px-3">
          <h2 className="text-center text-3xl font-bold w-full">Chiettaとは?</h2>
          <p className="mt-5 text-gray dark:text-lightGray text-center">
            ChiettaではQiitaやZennの記事や、企業の技術ブログなどの複数のサイトの技術記事をまとめています。
            Chiettaを使うことで色々なサイトを見て回る必要がなくなり、一つのサイトで簡単に情報収集をすることができます。
            通勤時間や休憩時間などの隙間時間に読める記事をお届けすることを目的として立ち上げられたサービスです。
          </p>
        </section>
        <section className="mt-[100px]">
          <h2 className="text-center text-3xl font-bold w-full">Chiettaで出来ること</h2>
          <div className="md:grid md:grid-cols-3 mt-10">
            <div className="w-[90%] dark:bg-white dark:text-black mx-auto mb-6 border border-[#b6b6b6] rounded-xl p-5 ">
              <h3 className="text-xl font-semibold">複数のサイトのサポート</h3>
              <Image src="/img/catPlayingBall.png" alt="検索画面" width={200} height={200} className="w-full" />
              <p className="text-gray">QiitaやZennの記事や、企業の技術ブログをまとめています。</p>
            </div>
            <div className="w-[90%] dark:bg-white dark:text-black mx-auto mb-6 border border-[#b6b6b6] rounded-xl p-5">
              <h3 className="text-xl font-semibold">カテゴリのフォロー</h3>
              <Image src="/img/catWalking.png" alt="検索画面" width={200} height={200} className="w-full" />
              <p className="text-gray">カテゴリをフォローをして、お気に入りのカテゴリの記事を読むことができます。</p>
            </div>
            <div className="w-[90%] dark:bg-white dark:text-black mx-auto mb-6 border border-[#b6b6b6] rounded-xl p-5">
              <h3 className="text-xl font-semibold">記事の共有</h3>
              <Image src="/img/catSitting.png" alt="検索画面" width={200} height={200} className="w-full" />
              <p className="text-gray">良いと思った記事をみんなへ共有しましょう。Xと一緒に共有することができます。</p>
            </div>
          </div>
        </section>
      </WrapContainer>
    </section>
  )
}

export default Works
