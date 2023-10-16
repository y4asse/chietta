import React from 'react'
import ContentLoader, { IContentLoaderProps } from 'react-content-loader'

const Skelton = (props: IContentLoaderProps) => (
  <div>
    <ContentLoader
      speed={3}
      width={340}
      height={70}
      viewBox="0 0 340 70"
      backgroundColor="#e0e0e0"
      foregroundColor="#ffffff"
      {...props}
    >
      <rect x="10" y="20" rx="0" ry="0" width="280" height="10" />
      <rect x="180" y="50" rx="0" ry="0" width="150" height="10" />
    </ContentLoader>
  </div>
)

export default Skelton
