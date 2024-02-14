import Link from 'next/link'

const Following = ({
  followingCount,
  followersCount,
  userName
}: {
  followingCount: number
  followersCount: number
  userName: string
}) => {
  return (
    <div className="mt-5 text-gray dark:text-lightGray">
      <Link className="hover:opacity-70" href={`/${userName}/following`}>
        <span className="text-black dark:text-white font-semibold">{followingCount}</span> following
      </Link>
      <span>・</span>
      <Link className="hover:opacity-70" href={`/${userName}/followers`}>
        <span className="text-black dark:text-white font-semibold">{followersCount}</span> followers
      </Link>
    </div>
  )
}

export default Following
