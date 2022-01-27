import '../static/style/components/asideCard.less'
import Author from './Author'
import Project from './Project'
import RecentBlog from './RecentBlog'
import TagCard from './TagCard'
import CategoryCard from './CategoryCard'
import Catalog from './Catalog'

const RightCard = (props) => {
  const { tags, categories, recentArticle, catalogData } = props

  return (
    <>
      <Author />
      <Project />
      {
        catalogData ? (
          <div className="sticky-layout">
            <Catalog catalogData={catalogData} />
            { recentArticle && <RecentBlog recentArticle={recentArticle} /> }
          </div>
        ) : (
          recentArticle && <RecentBlog recentArticle={recentArticle} />
        )
      }
      {/* { catalogData && <Catalog catalogData={catalogData} />}
      { recentArticle && <RecentBlog recentArticle={recentArticle} /> } */}
      { categories && <CategoryCard categories={categories} /> }
      { tags && <TagCard tags={tags} /> }
    </>
  )
}

export default RightCard
