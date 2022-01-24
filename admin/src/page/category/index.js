import React, { Component } from 'react'
import { Breadcrumb, Table, Space, Button, Modal, Input } from 'antd'
import { Link } from 'react-router-dom'
import ajax from '../../util/ajax'
export default class ArticleCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryList: [],
      categoryId: '',
      categoryName: '',
      categoryDesc: '',
      modalTitle: '',
      visible: false,
      loading: false,
    }

    this.columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '名称',
        dataIndex: 'name'
      },
      {
        title: '描述',
        dataIndex: 'desc'
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
    this.getCategoryList()
  }

  getCategoryList = () => {
    ajax.post('getCategoryList', { all: true }).then((res) => {
      this.setState({
        categoryList: res.data,
      })
    }).catch(e => {
      console.log(e)
    })
  }

  inputCategory = (e, field) => {
    this.setState({
      [field]: e.target.value.trim(),
    })
  }

  add = () => {
    this.setState({ visible: true, modalTitle: '新增类别', categoryId: '', categoryName: '', categoryDesc: '' })
  }

  update = (data) => {
    this.setState({ visible: true, modalTitle: '更新类别', categoryId: data.id, categoryName: data.name, categoryDesc: data.desc })
  }

  delete = (data) => {
    Modal.confirm({
      title: data.off === 1 ? '确认还原？' : '确认删除？',
      onOk: async () => {
        await ajax.post('delCategory', { id: data.id, off: data.off === 1 ? 0 : 1 })
        this.getCategoryList()
      },
    })
  }

  modalCancel = () => {
    this.setState({ visible: false })
  }

  modalOk = async () => {
    const { categoryId, categoryName, categoryDesc, loading } = this.state
    if (loading) return
    this.setState({ loading: true })
    try {
      await ajax.post('addCategory', {
        id: categoryId,
        name: categoryName,
        desc: categoryDesc
      })
      this.setState({ visible: false, loading: false })
      this.getCategoryList()
    } catch (e) {
      this.setState({ loading: false })
    }
  }

  render() {
    const { visible, modalTitle, categoryName, categoryDesc } = this.state
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
            新增类别
          </Button>
        </div>

        <div className="category-content">
          <Table rowKey="id" dataSource={this.state.categoryList} columns={this.columns} />
        </div>

        <Modal title={modalTitle} visible={visible} onOk={this.modalOk} onCancel={this.modalCancel} cancelText="取消" okText="提交">
          <span>名称：</span>
          <Input placeholder="输入类别名称" value={categoryName} onChange={(e) => this.inputCategory(e, 'categoryName')} />
          <span>描述</span>
          <Input placeholder="输入类别描述" value={categoryDesc} onChange={(e) => this.inputCategory(e, 'categoryDesc')} />
        </Modal>
      </>
    )
  }
}
