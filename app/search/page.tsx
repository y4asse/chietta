import WrapContainer from '@/components/layout/WrapContainer'
import React from 'react'
import Posts from '@/components/tech/Posts'
import Input from '@/components/search/Input'
import ScrollDetect from '@/components/scroll/ScrollDetect'
import { getPost } from '@/server/getPosts'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

const Search = async ({ searchParams }: { searchParams: { q: string } }) => {
  const { q } = searchParams
  const offset = 0
  const data = await getServerSession(authOptions)
  const userId = data ? data.user.id : null
  const filteredPosts = q ? await getPost('search', { offset, q, userId }) : null

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
