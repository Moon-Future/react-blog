import React, { Component } from 'react'
import { Breadcrumb, Table, Space, Button, Tag, Modal } from 'antd'
import { Link } from 'react-router-dom'
import ajax from '../../util/ajax'
import { formatTime } from '../../util/index'

class ArticleList extends Component {
  constructor(props) {
    super(props)
    this.userInfo = props.userInfo
    this.state = {
      articleList: [],
    }
    this.columns = [
      {
        title: '标题',
        dataIndex: 'title',
        width: 250
      },
      {
        title: '类别',
        dataIndex: 'category',
        render: (text, record) =>
          text.map((ele) => {
            return (
              <Tag key={ele.id} style={{marginBottom: '10px'}}>
                {ele.name}
              </Tag>
            )
          }),
      },
      {
        title: '标签',
        dataIndex: 'tag',
        render: (text, record) =>
          text.map((ele) => {
            return (
              <Tag color={ele.background} style={{ color: ele.color, marginBottom: '10px' }} key={ele.id}>
                {ele.name}
              </Tag>
            )
          }),
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
        sorter: (a, b) => a.view - b.view,
      },
      {
        title: '用户',
        dataIndex: 'nickname',
      },
      {
        title: '状态',
        dataIndex: 'state',
        render: (text, record) => {
          if (text === 0) {
            return <Tag color="#2db7f5">暂存搞</Tag>
          } else {
            return <Tag color="#87d068">已发布</Tag>
          }
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          if (record.user_id === this.userInfo.id || this.userInfo.root) {
            return (
              <Space size="middle">
                <Link to={`/addArticle?id=${record.id}`}>更新</Link>
                <Button type="link" danger onClick={() => this.delArticle(record)}>
                  删除
                </Button>
              </Space>
            )
          }
          return null
        },
      },
    ]
  }

  componentDidMount() {
    this.getArticleList()
  }

  getArticleList = () => {
    ajax
      .post('getArticleList')
      .then((res) => {
        let data = res.data
        data.forEach((ele) => {
          ele.add_time = formatTime(ele.add_time, 'yyyy-MM-dd hh:mm')
          ele.upd_time = formatTime(ele.upd_time, 'yyyy-MM-dd hh:mm')
        })
        this.setState({
          articleList: res.data,
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  delArticle = (data) => {
    Modal.confirm({
      title: data.off === 1 ? '确认还原？' : '确认删除？',
      onOk: async () => {
        await ajax.post('delArticle', { id: data.id })
        this.getArticleList()
      },
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
