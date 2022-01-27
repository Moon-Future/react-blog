import '../static/style/components/header.less'
import Link from 'next/link'
import { MyIcon } from '../util'

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
              <MyIcon type="icon-home" />
              <span>首页</span>
            </a>
          </Link>
          <Link href="/archive">
            <a className="menu-item">
              <MyIcon type="icon-archive" />
              <span>文档</span>
            </a>
          </Link>
          <Link href="/tag">
            <a className="menu-item">
              <MyIcon type="icon-tags" />
              <span>标签</span>
            </a>
          </Link>
          <Link href="/category">
            <a className="menu-item">
              <MyIcon type="icon-category" />
              <span>分类</span>
            </a>
          </Link>
          <Link href="/about">
            <a className="menu-item">
              <MyIcon type="icon-like_fill" />
              <span>关于</span>
            </a>
          </Link>
        </div>
        <div className="header-menu-mobile">
          <MyIcon type="icon-menu" />
        </div>
      </div>
    </div>
  )
}

export default Header
