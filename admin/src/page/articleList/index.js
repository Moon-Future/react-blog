import React, { Component } from 'react'
import { Breadcrumb, Table, Space } from 'antd'
import { Link } from 'react-router-dom'
import axios from '../../util/axios'
import API from '../../config/api'
import { formatTime } from '../../util/index'

class ArticleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articleList: [],
    }
    this.columns = [
      {
        title: '标题',
        dataIndex: 'title',
      },
      {
        title: '标签',
        dataIndex: 'tag',
      },
      {
        title: '创建时间',
        dataIndex: 'add_time',
      },
      {
        title: '更新时间',
        dataIndex: 'upd_time',
      },
      {
        title: '阅读次数',
        dataIndex: 'view',
      },
      {
        title: '用户',
        dataIndex: 'user_id',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a href="/">更新</a>
            <a href="/">删除</a>
          </Space>
        ),
      },
    ]
  }

  componentDidMount() {
    axios.get(API.getArticle).then((res) => {
      let data = res.data
      data.forEach((ele) => {
        ele.add_time = formatTime(ele.add_time, 'yyyy-MM-dd hh:mm')
        ele.upd_time = formatTime(ele.upd_time, 'yyyy-MM-dd hh:mm')
      })
      this.setState({
        articleList: res.data,
      })
    })
  }

  render() {
    return (
      <>
        <Breadcrumb className="bread-crumb">
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>文章列表</Breadcrumb.Item>
        </Breadcrumb>

        <div className="article-content">
          <Table rowKey="id" dataSource={this.state.articleList} columns={this.columns} />
        </div>
      </>
    )
  }
}

export default ArticleList
