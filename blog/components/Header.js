import React from 'react'
import Link from 'next/link'
import { HomeFilled, CalendarFilled, TagFilled, FolderOpenFilled, HeartFilled } from '@ant-design/icons'
import '../static/style/components/header.less'

const Header = (props) => {
  const { route } = props
  // const selectedKey = route === '/article' || route === '/detailed' ? '/article' : route
  const selectedKey = route

  return (
    <div className="header">
      <div className="header-row">
        <div className="header-name">
          <span className="header-txt">沉酿</span>
        </div>
        <div className="header-menu">
          <div className="menu-item">
            <HomeFilled />
            <Link href="/">首页</Link>
          </div>
          <div className="menu-item">
            <CalendarFilled />
            <Link href="/article">文档</Link>
          </div>
          <div className="menu-item">
          <TagFilled />
            <Link href="/article2">标签</Link>
          </div>
          <div className="menu-item">
            <FolderOpenFilled />
            <Link href="/article3">分类</Link>
          </div>
          <div className="menu-item">
            <HeartFilled />
            <Link href="/article4">关于</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
