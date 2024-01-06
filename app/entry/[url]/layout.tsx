import { Metadata } from 'next'
import { getOgp } from '@/server/getOgp'

export async function generateMetadata({ params }: { params: { url: string } }): Promise<Metadata> {
  const url = decodeURIComponent(params.url)
  const ogp = await getOgp(url)
  const title = ogp ? (ogp.ogTitle ? ogp.ogTitle : null) : null
  const image = ogp ? (ogp.ogImage ? ogp.ogImage[0].url : null) : null
  return {
    title: title ? title + ' | Chietta' : url + ' | Chietta',
    openGraph: {
      images: image ? image : undefined
    }
  }
}

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default Layout
