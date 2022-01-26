import React from 'react'
import '../static/style/components/asideCard.less'

import Author from './Author'
import Project from './Project'
import RecentBlog from './RecentBlog'
import TagCard from './TagCard'
import CategoryCard from './CategoryCard'

const RightCard = (props) => {
  const { tags, categories, recentArticle } = props

  return (
    <>
      <Author />
      <Project />
      { recentArticle && <RecentBlog recentArticle={recentArticle} /> }
      { categories && <CategoryCard categories={categories} /> }
      { tags && <TagCard tags={tags} /> }
    </>
  )
}

export default RightCard
