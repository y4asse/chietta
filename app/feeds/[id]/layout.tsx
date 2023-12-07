import FeedListLink from '@/components/LinkButton/FeedListLink'
import { getFeedInfo } from '@/server/getFeedInfo'
import { notFound } from 'next/navigation'
import React, { ReactNode } from 'react'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params
  const info = await getFeedInfo(id)
  return {
    title: info?.name + ' | Chietta'
  }
}

const Layout = async ({ params, children }: { params: { id: string }; children: ReactNode }) => {
  const { id } = params
  const info = await getFeedInfo(id)
  if (!info) return notFound()
  return (
    <div className="max-w-[1000px] mx-auto px-3">
      <div className="text-right">
        <FeedListLink />
      </div>
      <h1 className="text-xl font-bold mt-1">{info.name}</h1>
      <div className="mt-1">
        <a href={info.feedUrl} className="text-gray hover:underline">
          {info.feedUrl}
        </a>
      </div>
      <hr className="text-lightGray mt-5" />
      {children}
    </div>
  )
}

export default Layout
