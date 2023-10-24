'use client'

import { Provider } from 'jotai'
import React, { ReactNode } from 'react'
import History from '../jotai/History'

const JotaiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider>
      <History>{children}</History>
    </Provider>
  )
}

export default JotaiProvider
