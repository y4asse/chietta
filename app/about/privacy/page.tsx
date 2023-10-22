import WrapContainer from '@/components/layout/WrapContainer'
import React from 'react'

const Privacy = () => {
  return (
    <div className=" bg-pink py-[60px]">
      <WrapContainer>
        <div className="bg-[white] p-10 rounded-3xl shadow">
          <h1 className="text-2xl font-bold mb-6">プライバシーポリシー</h1>
          <p>当サイトは、お客様の個人情報を大切に考え、その保護のための措置を講じております。</p>

          <h2 className="text-xl mt-4 mb-4 font-bold">1. 収集する情報</h2>
          <p>
            当サイトでは、Google
            Analyticsを利用して、サイトの利用状況に関する情報を収集しています。これには、アクセス元やブラウザの種類、利用時間などの情報が含まれますが、これらは匿名で収集されており、個人を特定するものではありません。
          </p>

          <h2 className="text-xl mt-4 mb-4 font-bold">2. 情報の利用目的</h2>
          <p>収集した情報は、サイトの利用状況の分析、サイトの品質向上のための参考として利用します。</p>

          <h2 className="text-xl mt-4 mb-4 font-bold">3. 情報の第三者への提供</h2>
          <p>
            当サイトは、収集した情報を原則として第三者に提供することはありません。ただし、法的な要請があった場合や、当サイトの権利や財産を保護する必要がある場合を除きます。
          </p>

          <h2 className="text-xl mt-4 mb-4 font-bold">4. プライバシーポリシーの変更</h2>
          <p>当サイトは、必要に応じてプライバシーポリシーの内容を変更することがあります。</p>

          <h2 className="text-xl mt-4 mb-4 font-bold">5. 問い合わせ</h2>
          <p>
            プライバシーポリシーに関する質問や疑問については、開発者（
            <a href="https://twitter.com/y4isse" className="underline" target="blank">
              y4asse
            </a>
            ）へご連絡ください。
          </p>
        </div>
      </WrapContainer>
    </div>
  )
}

export default Privacy
