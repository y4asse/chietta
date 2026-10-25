'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import cat from '../../public/lottie/cat.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const CatAnimation = () => {
  return <Lottie animationData={cat} />
}

export default CatAnimation
