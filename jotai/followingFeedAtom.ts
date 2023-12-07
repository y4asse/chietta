import { Feed } from '@prisma/client'
import { atom } from 'jotai'

export const followingFeedAtom = atom<Feed[]>([])
