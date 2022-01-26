import Link from 'next/link'
import { HomeFilled, CalendarFilled, TagFilled, FolderOpenFilled, HeartFilled } from '@ant-design/icons'
import '../static/style/components/header.less'

const Header = () => {
  return (
    <div className="header">
      <div className="header-background"></div>
      <div className="header-row">
        <div className="header-name">
          <span className="header-txt">
            <Link href="/">沉酿</Link>
          </span>
        </div>
        <div className="header-menu">
          <Link href="/" >
            <a className="menu-item">
              <HomeFilled />
              <span>首页</span>
            </a>
          </Link>
          <Link href="/archive">
            <a className="menu-item">
              <CalendarFilled />
              <span>文档</span>
            </a>
          </Link>
          <Link href="/tag">
            <a className="menu-item">
              <TagFilled />
              <span>标签</span>
            </a>
          </Link>
          <Link href="/category">
            <a className="menu-item">
              <FolderOpenFilled />
              <span>分类</span>
            </a>
          </Link>
          <Link href="/about">
            <a className="menu-item">
              <HeartFilled />
              <span>关于</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
