import Link from 'next/link'
import React from 'react'

const FeedListLink = () => {
  return (
    <Link
      href="/feeds/list/0"
      className="border border-[#afafaf] px-3 py-1 rounded bg-white dark:bg-lightDark hover:bg-lightGray duration-200 transition-all dark:hover:bg-gray"
    >
      フィード一覧
    </Link>
  )
}

export default FeedListLink
