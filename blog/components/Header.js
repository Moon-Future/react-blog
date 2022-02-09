import '../static/style/components/header.less'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Author from './Author'
import { MyIcon } from '../util'

const Header = () => {
  const [menuShow, setMenuShow] = useState(false)
  const [fixed, setFixed] = useState(false)
  const [top, setTop] = useState(false)

  const clickMenuIcon = () => {
    setMenuShow(true)
  }

  const clickMask = () => {
    setMenuShow(false)
  }

  const clickMenu = () => {
    setMenuShow(false)
  }

  // useEffect(() => {
  //   let beforeScrollTop = document.documentElement.scrollTop || document.body.scrollTop
  //   window.addEventListener('scroll', () => {
  //       const afterScrollTop = document.documentElement.scrollTop || document.body.scrollTop
  //       const delta = afterScrollTop - beforeScrollTop
  //       // delta < 0 && afterScrollTop >= 0 ? setFixed(true) : setFixed(false)
  //       // afterScrollTop <= 0 ? setTop(true) : setTop(false)
  //       beforeScrollTop = afterScrollTop
  //     }, false)
  // }, [])

  return (
    <div className="header">
      <div className="header-background"></div>
      <div className="header-row">
        <div className={`mobile-mask ${menuShow ? 'open' : 'close'}`} onClick={clickMask}></div>
        <div className="header-name">
          <span className="header-txt">
            <Link href="/">沉酿</Link>
          </span>
        </div>
        <div className="header-menu">
          <Link href="/">
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
          {/* <Link href="/about">
            <a className="menu-item">
              <MyIcon type="icon-like_fill" />
              <span>关于</span>
            </a>
          </Link> */}
        </div>
        <div className="header-menu-icon" onClick={clickMenuIcon}>
          <MyIcon type="icon-menu" />
        </div>
        <div className={`header-menu-aside ${menuShow ? 'open' : ''}`}>
          <Author />
          <hr></hr>
          <div className="header-menu-mobile">
            <Link href="/">
              <a className="menu-item" onClick={clickMenu}>
                <MyIcon type="icon-home" />
                <span>首页</span>
              </a>
            </Link>
            <Link href="/archive">
              <a className="menu-item" onClick={clickMenu}>
                <MyIcon type="icon-archive" />
                <span>文档</span>
              </a>
            </Link>
            <Link href="/tag">
              <a className="menu-item" onClick={clickMenu}>
                <MyIcon type="icon-tags" />
                <span>标签</span>
              </a>
            </Link>
            <Link href="/category">
              <a className="menu-item" onClick={clickMenu}>
                <MyIcon type="icon-category" />
                <span>分类</span>
              </a>
            </Link>
            {/* <Link href="/about">
              <a className="menu-item" onClick={clickMenu}>
                <MyIcon type="icon-like_fill" />
                <span>关于</span>
              </a>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
