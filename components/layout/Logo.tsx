import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className="text-3xl font-extrabold flex items-center gap-2">
      <Image
        src={`${process.env.NEXT_PUBLIC_FRONT_URL}/img/catCircle.png`}
        alt="Chiettaのロゴ画像"
        width={200}
        height={200}
        className="w-[30px]"
      />

      <span className="relative">Chietta</span>
    </div>
  )
}

export default Logo
