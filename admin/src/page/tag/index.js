import React, { Component } from 'react'
import { Breadcrumb, Table, Space, Button, Modal, Input  } from 'antd'
import { Link } from 'react-router-dom'
import axios from '../../util/axios'
import API from '../../config/api'

export default class Tag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tagList: [],
      tagId: '',
      tagName: '',
      visible: false,
      modalTitle: '',
      loading: false
    }

    this.columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '名称',
        dataIndex: 'name',
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
              { record.off === 1 ? '还原' : '删除' }
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
    axios.post(API.getTagList, { all: true }).then(res => {
      this.setState({
        tagList: res.data
      })
    })
  }

  inputTag = (e) => {
    this.setState({
      tagName: e.target.value.trim(),
    })
  }

  add = () => {
    this.setState({ visible: true, modalTitle: '新增标签', tagId: '', tagName: '' })
  }

  update = (data) => {
    this.setState({ visible: true, modalTitle: '更新标签', tagId: data.id, tagName: data.name })
  }

  delete = (data) => {
    Modal.confirm({
      title: data.off === 1 ? '确认还原？' : '确认删除？',
      onOk: async () => {
        await axios.post(API.delTag, { id: data.id, off: data.off === 1 ? 0 : 1 })
        this.getTagList()
      }
    })
  }

  modalCancel = () => {
    this.setState({ visible: false })
  }

  modalOk = async () => {
    const { tagId, tagName, loading } = this.state
    if (loading) return
    this.setState({ loading: true })
    try {
      await axios.post(API.addTag, {
        id: tagId,
        name: tagName
      })
      this.setState({ visible: false, loading: false })
      this.getTagList()
    } catch (e) {
      this.setState({ loading: false })
    }
  }

  render() {
    const { visible, modalTitle, tagName } = this.state
    return (
      <>
        <Breadcrumb className="bread-crumb">
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>标签</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
          <Button type="primary" onClick={this.add}>新增标签</Button>
        </div>

        <div className="tag-content">
          <Table rowKey="id" dataSource={this.state.tagList} columns={this.columns} />
        </div>

        <Modal title={modalTitle} visible={visible} onOk={this.modalOk} onCancel={this.modalCancel} cancelText="取消" okText="提交">
          <p>名称：</p>
          <Input placeholder="输入标签名称" value={tagName} onChange={(e) => this.inputTag(e)} />
        </Modal>
      </>
    )
  }
}
