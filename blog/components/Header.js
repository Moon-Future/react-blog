import React from 'react'
import Link from 'next/link'
import { Row, Col, Menu } from 'antd'
import '../static/style/components/header.less'

const Header = (props) => {
  const { route } = props
  // const selectedKey = route === '/article' || route === '/detailed' ? '/article' : route
  const selectedKey = route

  return (
    <div className="header">
      <div className="header-bg"></div>
      <Row type="flex" justify="space-between" className="header-row">
        <Col className="header-left" xs={0} sm={10} md={10} lg={10} xl={10}>
          {/* <span className="header-txt">2</span> */}
        </Col>
        <Col xs={12} sm={12} md={12} lg={8} xl={6}>
          <Menu mode="horizontal" selectedKeys={[selectedKey]}>
            <Menu.Item key="/">
              <Link href="/">首页</Link>
            </Menu.Item>
            <Menu.Item key="/article">
              <Link href="/article">文章</Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header
