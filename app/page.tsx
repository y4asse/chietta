import PostItem from '@/components/tech/PostItem'
import { Post } from '@prisma/client'

export type OGP = {
  title: string
  image: string
}

export type PostOgp = {
  // post: Post;
  ogp: OGP
}

const getPosts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
      // next: { revalidate: 0 } // 5分キャッシュ
      cache: 'no-cache'
    })
    if (!res.ok) {
      console.log('Http Error')
      console.log('status: ' + res.status)
      console.log('statusText: ' + res.statusText)
      throw new Error(`HTTP error! Status: ${res.statusText}`)
    }
    const { posts } = (await res.json()) as { posts: Post[] }
    return posts
  } catch (error) {
    console.log(error)
    return null
  }
}

export default async function Home() {
  const posts = await getPosts()
  if (!posts) return <div>error</div>
  return (
    <main className="min-h-screen">
      <div className="bg-pink p-10">
        <h1 className=" bg-pink text-center text-3xl font-bold">新着</h1>
      </div>
      <div className="grid grid-cols-1 text-center shadow-lg">
        {posts.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
        <button className="border">もっと</button>
      </div>
    </main>
  )
}
