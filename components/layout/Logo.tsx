import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className="text-3xl font-extrabold flex items-center gap-2">
      <Image src={'/img/catCircle.png'} alt="Chiettaのロゴ画像" width={200} height={200} className="w-[30px]" />

      <span className="relative">
        Chietta
        <Image
          src={'/img/take.png'}
          alt="Chiettaのロゴ画像"
          width={200}
          height={200}
          className="absolute w-[30px] top-0 left-full"
        />
      </span>
    </div>
  )
}

export default Logo
