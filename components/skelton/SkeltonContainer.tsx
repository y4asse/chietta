import React from 'react'
import Skelton from './ContentSkelton'
import ImageSkelton from './ImageSkelton'

const SkeltonContainer = () => {
  return (
    <div className="flex mx-auto flex-wrap p-5  gap-10 max-w-[800px] ">
      <div className="rounded-xl overflow-hidden w-[340px] mx-auto bg-white dark:bg-lightDark border-[#cacaca] border-2">
        <ImageSkelton />
        <Skelton />
      </div>
      <div className="rounded-xl overflow-hidden w-[340px] mx-auto bg-white dark:bg-lightDark border-[#cacaca] border-2">
        <ImageSkelton />
        <Skelton />
      </div>
    </div>
  )
}

export default SkeltonContainer
