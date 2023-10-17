import WrapContainer from '@/components/layout/WrapContainer'
import React from 'react'
import { ReturnPost } from '../api/post/route'
import Posts from '@/components/tech/Posts'
import Input from '@/components/search/Input'
import ScrollDetect from '@/components/scroll/ScrollDetect'
import { getSearchPosts } from '@/server/getPosts'

const Search = async ({ searchParams }: { searchParams: { q: string } }) => {
  const { q } = searchParams
  const offset = 0
  const filteredPosts = q ? await getSearchPosts(offset, q) : null

  return (
    <div className="py-10 border-b border-[#cacaca] min-h-screen bg-[#fffafa]">
      <WrapContainer>
        <Input q={q} />
        {filteredPosts ? (
          filteredPosts.length === 0 ? (
            <div className="text-center text-gray text-2xl font-bold mt-10">見つかりませんでした</div>
          ) : (
            <ScrollDetect type="search" q={q} key={q}>
              <Posts posts={filteredPosts} />
            </ScrollDetect>
          )
        ) : (
          <div className="text-center text-gray text-2xl font-bold mt-10">検索してみましょう</div>
        )}
      </WrapContainer>
    </div>
  )
}

export default Search
