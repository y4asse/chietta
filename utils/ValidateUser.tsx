'use client'

import { sessionAtom } from '@/jotai/sessionAtom'
import { useAtom } from 'jotai'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ValidateUser = () => {
  const [state] = useAtom(sessionAtom)
  const { data: session, status } = state
  const router = useRouter()
  const path = usePathname()
  useEffect(() => {
    if (status === 'loading') return
    if (session && !session.user.idCreatedByUser) {
      router.push(`/user/create/${session.user.id}`)
    }
  }, [session])
  return null
}

export default ValidateUser
