'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import check from '../../../public/lottie/check.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const CheckAnimation = () => {
  return <Lottie animationData={check} />
}

export default CheckAnimation
