import React from 'react'
import ContentLoader, { IContentLoaderProps } from 'react-content-loader'

const ImageSkelton = (props: IContentLoaderProps) => {
  return (
    <div className="border-b-2 border-[#cacaca]">
      <ContentLoader
        speed={0}
        width={340}
        height={180}
        viewBox="0 0 340 180"
        backgroundColor="#e0e0e0"
        foregroundColor="#ffffff"
        {...props}
      >
        <rect x="0" y="0" rx="0" ry="0" width="340" height="180" />
      </ContentLoader>
    </div>
  )
}

export default ImageSkelton
