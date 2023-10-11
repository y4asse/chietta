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
      // cache: 'no-cache'
      next: { revalidate: 60 * 5 }
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
    <main className="min-h-screen min-w-[340px] bg-[#fffafa] items-center py-10">
      <h1 className=" text-center text-3xl font-bold">新着の記事</h1>
      <div className="flex mx-auto flex-wrap p-5  gap-10 max-w-[800px] mt-10">
        {posts.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
        {/* <button className="border">もっと</button> */}
      </div>
    </main>
  )
}
