import React from 'react'
import { Row, Col, Menu } from 'antd'
import '../static/style/components/header.scss'

const Header = () => (
  <div className="header">
    <div className="header-bg"></div>
    <Row type="flex" justify="center">
      <Col className="header-left" xs={22} sm={10} md={10} lg={10} xl={10}>
        <span className="header-txt">ChenLiang</span>
      </Col>
      <Col xs={0} sm={12} md={12} lg={8} xl={6}>
        <Menu mode="horizontal">
          <Menu.Item key="home">首页</Menu.Item>
          <Menu.Item key="video">文章</Menu.Item>
          <Menu.Item key="life">生活</Menu.Item>
        </Menu>
      </Col>
    </Row>
  </div>
)

export default Header
