import React from 'react'
import { Row, Col, Menu } from 'antd'
import '../static/style/components/header.css'

const Header = () => (
  <div className="header">
    <Row type="flex" justify="center">
      <Col span={24}>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            首页
          </Menu.Item>
          <Menu.Item key="video">
            视频
          </Menu.Item>
          <Menu.Item key="life">
            生活
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  </div>
)

export default Header
