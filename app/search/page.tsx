import WrapContainer from '@/components/layout/WrapContainer'
import React from 'react'
import { ReturnPost } from '../api/post/route'
import Posts from '@/components/tech/Posts'

const getFilteredPosts = async (q: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?q=${q}`)
  if (!res.ok) {
    console.log('error')
    console.log('status', res.status)
    console.log('statusText', res.statusText)
    return null
  }
  const posts = (await res.json()) as ReturnPost[]
  return posts
}

const Search = async ({ searchParams }: { searchParams: { q: string } }) => {
  const { q } = searchParams
  const filteredPosts = q ? await getFilteredPosts(q) : null

  return (
    <div className="py-10 border-b border-[#cacaca] min-h-screen bg-[#fffafa]">
      <WrapContainer>
        <form action="/search">
          <input
            type="text"
            name="q"
            required
            className="border border-[#b6b6b6] px-5 py-3 text-lg rounded-full w-full cursor focus:outline-[#fdcaca]"
          />
        </form>
        {filteredPosts ? (
          filteredPosts.length === 0 ? (
            <div>見つかりませんでした</div>
          ) : (
            <Posts posts={filteredPosts} />
          )
        ) : (
          <div className="text-center">検索してみましょう</div>
        )}
      </WrapContainer>
    </div>
  )
}

export default Search
