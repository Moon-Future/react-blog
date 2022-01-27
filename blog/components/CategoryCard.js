import '../static/style/components/categoryCard.less'
import Link from 'next/link'
import { MyIcon } from '../util'

const CategoryCard = (props) => {
  const { categories = [] } = props

  return (
    <div className="category-box card-box">
      <div className="card-headline">
        <MyIcon type="icon-category" />
        <span className="card-title">分类</span>
      </div>
      <div className="category-list">
        {
          categories && categories.map(ele => {
            return (
              <Link href={'/category?id=' + ele.id} key={ele.id}>
                <a className="category-item">
                  <span>{ele.name}</span>
                </a>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default CategoryCard
