'use client'

import { bookmarkAtom } from '@/jotai/bookmarkAtom'
import { followingAtom } from '@/jotai/followingAtom'
import { followingFeedAtom } from '@/jotai/followingFeedAtom'
import { likeAtom } from '@/jotai/likeAtom'
import { sessionAtom } from '@/jotai/sessionAtom'
import { viewHistoryAtom } from '@/jotai/viewHistory'
import { getFollowingByUserId } from '@/server/category'
import { Feed, FollowFeed, Like } from '@prisma/client'
import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { getBookmarkings } from './actions/actions'

const ClientProvider = () => {
  const [, setLikes] = useAtom(likeAtom)
  const [, setSession] = useAtom(sessionAtom)
  const [, setHistory] = useAtom(viewHistoryAtom)
  const [, setFollowing] = useAtom(followingAtom)
  const [, setBookmarking] = useAtom(bookmarkAtom)
  const [, setFollowingFeed] = useAtom(followingFeedAtom)

  const { data: session, status } = useSession()
  const userId = session ? session.user.id : null
  useEffect(() => {
    if (status === 'loading') return
    if (!userId) return

    // 視聴履歴の取得
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/view?user_id=${userId}`, {
      cache: 'no-cache'
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('エラーが発生しました')
        }
        const data = (await res.json()) as { post_url: string }[]
        setHistory(data.map((d) => d.post_url))
      })
      .catch((err) => {
        setHistory([])
      })

    // フォロー中のカテゴリの取得
    getFollowingByUserId(userId).then((data) => {
      if (data) {
        const following = data.map((item) => item.postCategory.id)
        setFollowing(following)
      }
    })
  }, [userId])

  useEffect(() => {
    if (!session) return
    const fetchFeeds = async () => {
      const res = await fetch(`/api/feeds/following/${session.user.id}`)
      if (!res.ok) return
      const data = (await res.json()) as { result: FollowFeed & { feed: Feed }[] }
      const followingFeeds = data.result.map((item) => item.feed)
      setFollowingFeed(followingFeeds)
    }
    fetchFeeds()
  }, [session])

  useEffect(() => {
    if (!userId) return
    const fetchLikes = async () => {
      try {
        const res = await fetch(`/api/like/${userId}`)
        if (!res.ok) throw new Error('エラーが発生しました')
        const data = (await res.json()) as { likes: Like[] }
        if (!data.likes) throw new Error('無効なレスポンス')
        setLikes(data.likes.map((item) => item.user_post_id))
      } catch (err: any) {
        console.log(err)
        return
      }
    }
    fetchLikes()
  }, [userId])

  useEffect(() => {
    if (!userId) return
    const fetchBookmarking = async () => {
      const { bookmarks, error } = await getBookmarkings()
      if (error || !bookmarks) return
      setBookmarking(bookmarks.map((item) => ({ url: item.entry.url })))
    }
    fetchBookmarking()
  }, [userId])

  useEffect(() => {
    setSession({ data: session, status })
  }, [session])
  return null
}

export default ClientProvider
