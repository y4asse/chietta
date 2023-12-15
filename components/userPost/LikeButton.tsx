'use client'
import like from '@/public/lottie/like.json'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import { usePathname, useRouter } from 'next/navigation'

const LikeButton = ({
  userPostId,
  defaultLiked,
  defaultCount
}: {
  userPostId: string
  defaultLiked: boolean
  defaultCount: number
}) => {
  const { data: session, status } = useSession()
  const user = session ? session.user : null
  const playerRef = useRef<Player>(null)
  const [isLiked, setIsLiked] = useState(false)
  const router = useRouter()
  const [count, setCount] = useState(defaultCount)
  useEffect(() => {
    if (defaultLiked) {
      playerRef.current && playerRef.current.play()
      setIsLiked(true)
    }
  }, [defaultLiked])

  const handleClick = async () => {
    if (!user) {
      router.push('/login')
      return
    }
    if (status === 'loading') return
    setIsLiked((prev) => !prev)
    try {
      if (isLiked) {
        playerRef.current && playerRef.current.stop()
        setCount((prev) => prev - 1)
        const res = await fetch(`/api/like/${user.id}`, {
          method: 'DELETE',
          cache: 'no-cache',
          body: JSON.stringify({ user_post_id: userPostId })
        })
        if (!res.ok) {
          throw new Error('エラーが発生しました')
        }
      } else {
        playerRef.current && playerRef.current.stop()
        playerRef.current && playerRef.current.play()
        setCount((prev) => prev + 1)
        const res = await fetch(`/api/like/${user.id}`, {
          method: 'POST',
          cache: 'no-cache',
          body: JSON.stringify({ user_post_id: userPostId })
        })
        if (!res.ok) {
          throw new Error('エラーが発生しました')
        }
      }
    } catch (err) {
      alert('エラーが発生しました')
      setIsLiked((prev) => !prev)
      if (isLiked) {
        setCount((prev) => prev + 1)
      } else {
        setCount((prev) => prev - 1)
      }
    }
  }
  return (
    <div className="flex items-center gap-1">
      <button
        className={`w-[30px] md:w-[40px] h-[30px] md:h-[40px] rounded-full flex justify-center items-center`}
        onClick={handleClick}
      >
        <Player ref={playerRef} speed={1.8} keepLastFrame={true} src={like} autoplay={defaultLiked} />
      </button>
      <span>{count}</span>
    </div>
  )
}

export default LikeButton
