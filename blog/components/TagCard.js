import React from 'react'
import '../static/style/components/tagCard.less'
import Link from 'next/link'
import { TagFilled } from '@ant-design/icons'

const TagCard = (props) => {
  const { tags = [] } = props

  return (
    <div className="tag-box card-box">
      <div className="card-headline">
        <TagFilled />
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
