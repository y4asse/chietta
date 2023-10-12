import React, { ReactNode } from 'react'

const WrapContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto max-w-[1000px] min-w-[300px]">
      <div className="mx-5">{children}</div>
    </div>
  )
}

export default WrapContainer
