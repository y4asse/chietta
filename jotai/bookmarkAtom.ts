import { atom } from 'jotai'

export const bookmarkAtom = atom<{ url: string }[]>([])
