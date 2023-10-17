'use client'

import React from 'react'

const Spinner = ({ color = 'border-[#ffbfbf]' }: { color?: string }) => {
  return (
    <div className="flex justify-center mt-5" aria-label="読み込み中">
      <span
        style={{ borderBottomColor: 'transparent' }}
        className=" animate-spin h-10 w-10 border-4 border-[#ffbfbf] rounded-full"
      ></span>
    </div>
  )
}

export default Spinner
