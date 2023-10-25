import React, { ReactNode } from 'react'

const WrapContainer = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto max-w-[1000px] min-w-[300px]">{children}</div>
}

export default WrapContainer
