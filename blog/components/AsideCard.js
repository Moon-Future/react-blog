import React, { useState } from 'react'
import Link from 'next/link'
import { List, Image } from 'antd'
import '../static/style/components/asideCard.less'

import Author from './Author'
import Project from './Project'

const RightCard = (props) => {
  const [articleList] = useState(props.articleList)
  const defaultCover = 'https://static-1255423800.cos.ap-guangzhou.myqcloud.com/image/blog/cover-default_02.jpg'

  return (
    <>
      <Author />
      <Project />
    </>
  )
}

export default RightCard
