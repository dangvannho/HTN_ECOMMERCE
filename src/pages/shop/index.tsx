import React from 'react'

import SidebarCategory from './_components/sidebar-category/sidebar-category'
import MainCategory from './_components/main-category/main-category'

const Category = () => {
  return (
    <div className='max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto block md:flex gap-6'>
      <SidebarCategory/>
      <MainCategory/>
    </div>
  )
}

export default Category