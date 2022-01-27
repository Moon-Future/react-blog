import '../static/style/components/tagCard.less'
import Link from 'next/link'
import { MyIcon } from '../util'

const TagCard = (props) => {
  const { tags = [] } = props

  return (
    <div className="tag-box card-box">
      <div className="card-headline">
        <MyIcon type="icon-tags" />
        <span className="card-title">标签</span>
      </div>
      <div className="tag-list">
        {
          tags && tags.map(ele => {
            return (
              <Link href={'/tag?id=' + ele.id} key={ele.id}>
                <a className="tag-item">
                  {ele.name}
                </a>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default TagCard
