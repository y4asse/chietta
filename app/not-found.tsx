import Image from 'next/image'
import React from 'react'

const NotFound = () => {
  return (
    <div className="text-center py-[140px] font-bold dark:bg-lightDark dark:text-white">
      <h1 className="text-3xl">お探しのページが見つかりません</h1>
      <Image className="mx-auto" src="/img/cat.png" alt="猫の画像" width={300} height={300} />
    </div>
  )
}

export default NotFound
