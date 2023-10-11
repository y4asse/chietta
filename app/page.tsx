import ScrollDetect from '@/components/scroll/ScrollDetect'
import Posts from '@/components/tech/Posts'
import { Post } from '@prisma/client'

const getPosts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!res.ok) {
      console.log('Http Error')
      console.log('status: ' + res.status)
      console.log('statusText: ' + res.statusText)
      throw new Error(`HTTP error! Status: ${res.statusText}`)
    }
    const posts = (await res.json()) as Post[]
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
      <h1 className="text-center text-3xl font-bold mt-5">新着の記事</h1>
      <ScrollDetect>
        <Posts posts={posts} />
      </ScrollDetect>
    </main>
  )
}
