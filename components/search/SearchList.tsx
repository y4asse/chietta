import React from 'react'
import ScrollDetect from '../scroll/ScrollDetect'
import Posts from '../tech/Posts'
import { getPost } from '@/server/getPosts'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/server/auth'
import ErrorComponent from '../error/ErrorComponent'

const SearchList = async ({ q }: { q: string }) => {
  const offset = 0
  const data = await getServerSession(authOptions)
  const userId = data ? data.user.id : null
  const filteredPosts = q ? await getPost('search', { offset, q, userId }) : null
  return (
    <div>
      {filteredPosts ? (
        filteredPosts.length === 0 ? (
          <div className="text-center text-gray text-2xl font-bold mt-10">見つかりませんでした</div>
        ) : (
          <ScrollDetect type="search" q={q} key={q}>
            <Posts posts={filteredPosts} />
          </ScrollDetect>
        )
      ) : (
        <ErrorComponent />
      )}
    </div>
  )
}

export default SearchList
