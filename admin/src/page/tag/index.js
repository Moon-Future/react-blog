import React, { Component } from 'react'
import { Breadcrumb, Table, Space, Button, Modal, Input, Tag } from 'antd'
import { Link } from 'react-router-dom'
import ajax from '../../util/ajax'
export default class ArticleTag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tagList: [],
      tagId: '',
      tagName: '',
      color: '',
      background: '',
      visible: false,
      modalTitle: '',
      loading: false,
    }

    this.columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '名称',
        dataIndex: 'name',
        render: (text, record) => (
          <Tag color={record.background} style={{ color: record.color }}>
            {text}
          </Tag>
        ),
      },
      {
        title: '字体色',
        dataIndex: 'color',
        render: (text, record) => <span style={{ color: text, fontWeight: 'bold' }}>{text}</span>,
      },
      {
        title: '背景色',
        dataIndex: 'background',
        render: (text, record) => <span style={{ color: text, fontWeight: 'bold' }}>{text}</span>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Button type="link" onClick={() => this.update(record)}>
              更新
            </Button>
            <Button type="link" danger onClick={() => this.delete(record)}>
              {record.off === 1 ? '还原' : '删除'}
            </Button>
          </Space>
        ),
      },
    ]
  }

  componentDidMount() {
    this.getTagList()
  }

  getTagList = () => {
    ajax.post('getTagList', { all: true }).then((res) => {
      this.setState({
        tagList: res.data,
      })
    })
  }

  inputTag = (e, field) => {
    this.setState({
      [field]: e.target.value.trim(),
    })
  }

  add = () => {
    this.setState({ visible: true, modalTitle: '新增标签', tagId: '', tagName: '', color: '', background: '' })
  }

  update = (data) => {
    this.setState({ visible: true, modalTitle: '更新标签', tagId: data.id, tagName: data.name, color: data.color, background: data.background })
  }

  delete = (data) => {
    Modal.confirm({
      title: data.off === 1 ? '确认还原？' : '确认删除？',
      onOk: async () => {
        await ajax.post('delTag', { id: data.id, off: data.off === 1 ? 0 : 1 })
        this.getTagList()
      },
    })
  }

  modalCancel = () => {
    this.setState({ visible: false })
  }

  modalOk = async () => {
    const { tagId, tagName, color, background, loading } = this.state
    if (loading) return
    this.setState({ loading: true })
    try {
      await ajax.post('addTag', {
        id: tagId,
        name: tagName,
        color,
        background,
      })
      this.setState({ visible: false, loading: false })
      this.getTagList()
    } catch (e) {
      this.setState({ loading: false })
    }
  }

  render() {
    const { visible, modalTitle, tagName, color, background } = this.state
    return (
      <>
        <Breadcrumb className="bread-crumb">
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>标签</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
          <Button type="primary" onClick={this.add}>
            新增标签
          </Button>
        </div>

        <div className="tag-content">
          <Table rowKey="id" dataSource={this.state.tagList} columns={this.columns} />
        </div>

        <Modal title={modalTitle} visible={visible} onOk={this.modalOk} onCancel={this.modalCancel} cancelText="取消" okText="提交">
          <span>名称：</span>
          <Input placeholder="输入标签名称" value={tagName} onChange={(e) => this.inputTag(e, 'tagName')} />
          <span>字体色：</span>
          <Input placeholder="输入标签字体色" value={color} onChange={(e) => this.inputTag(e, 'color')} />
          <span>背景色：</span>
          <Input placeholder="输入标签背景色" value={background} onChange={(e) => this.inputTag(e, 'background')} />
          <Tag color={background} style={{ color: color, marginTop: '10px' }}>
            {tagName || 'Tag'}
          </Tag>
        </Modal>
      </>
    )
  }
}
