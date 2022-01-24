import React from 'react'
import '../static/style/components/asideCard.less'

import Author from './Author'
import Project from './Project'
import RecentBlog from './RecentBlog'
import TagCard from './TagCard'
import CategoryCard from './CategoryCard'

const RightCard = (props) => {

  return (
    <>
      <Author />
      <Project />
      <RecentBlog />
      <TagCard />
      <CategoryCard />
    </>
  )
}

export default RightCard
