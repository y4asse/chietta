import Link from 'next/link'
import React from 'react'

const FeedListLink = () => {
  return (
    <Link
      href="/feeds/list"
      className="border border-[#afafaf] px-3 py-1 rounded bg-[white] hover:bg-lightGray duration-200 transition-all"
    >
      フィード一覧
    </Link>
  )
}

export default FeedListLink
