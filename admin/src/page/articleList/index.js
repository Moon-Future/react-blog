import React, { Component } from 'react'
import { Breadcrumb, Table, Space, Button, Tag } from 'antd'
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
        render: (text, record) => (
          text.map(ele => {
            return <Tag key={ele.id}>{ele.name}</Tag>
          })
        )
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
        title: '状态',
        dataIndex: 'state',
        render: (text, record) => {
          if (text === 0) {
            return <Tag color='#2db7f5'>暂存搞</Tag>
          } else {
            return <Tag color='#87d068'>已发布</Tag>
          }
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Link to={`/addArticle?id=${record.id}`}>更新</Link>
            <Button type="link" danger onClick={this.delArticle}>删除</Button>
          </Space>
        ),
      },
    ]
  }

  componentDidMount() {
    axios.post(API.getArticleList).then((res) => {
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

  delArticle = () => {
    console.log(this)
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
