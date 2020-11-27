import React, { Component } from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

class ArticleList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/">文章列表</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <p>article</p>
      </div>
    )
  }
}

export default ArticleList
