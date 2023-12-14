import { atom } from 'jotai'
import { Session } from 'next-auth'

export const sessionAtom = atom<{ data: Session | null; status: 'unauthenticated' | 'loading' | 'authenticated' }>({
  data: null,
  status: 'loading'
})
