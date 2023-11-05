import Categories from '@/components/category/Categories'
import WrapContainer from '@/components/layout/WrapContainer'
import { getAllCategories } from '@/server/category'
import React from 'react'

const Category = async () => {
  const allCategories = await getAllCategories()
  if (!allCategories) return <WrapContainer>error</WrapContainer>
  return (
    <WrapContainer>
      <Categories allCategories={allCategories} />
    </WrapContainer>
  )
}

export default Category
