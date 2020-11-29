import React, { Component } from 'react'
import { Breadcrumb, Input, Row, Col, Button, Image, Tag, DatePicker, message } from 'antd'
import { Link } from 'react-router-dom'
import './index.scss'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { PlusOutlined } from '@ant-design/icons'
import axios from '../../util/axios'
import API from '../../config/api'

class AddArticle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      html: '',
      summary: '',
      coverSrc: '',
      defaultSrc: 'https://cdn.pixabay.com/photo/2020/05/06/00/15/cyberpunk-5135622__480.jpg',
      tags: [],
      tagInputVisible: false,
      tagValue: '',
      addTime: '',
      updTime: '',
      loading: false,
    }
  }

  componentDidMount() {
    // markd 配置
    const renderer = new marked.Renderer()
    marked.setOptions({
      renderer: renderer,
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: false,
      smartLists: true,
      smartypants: false,
      sanitize: false,
      xhtml: false,
      highlight: function (code) {
        return hljs.highlightAuto(code).value
      },
    })
  }

  inputValue(e, field) {
    this.setState({
      [field]: e.target.value.trim(),
    })
  }

  // markdown 字符串
  mdContent(e) {
    const value = e.target.value
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({
        html: marked(value),
      })
    }, 500)
    this.setState({
      content: value,
    })
  }

  // 文章封面图失败是默认值
  imgError(e) {
    this.setState({
      defaultSrc: 'https://cdn.pixabay.com/photo/2020/05/06/00/15/cyberpunk-5135622__480.jpg',
    })
  }

  // 删除标签
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter((tag) => tag !== removedTag)
    this.setState({ tags })
  }

  // 显示新增标签输入框
  showInput = () => {
    this.setState({ tagInputVisible: true }, () => this.input.focus())
  }

  // 新增标签query
  handleInputConfirm = () => {
    const { tagValue } = this.state
    let { tags } = this.state
    if (tagValue && tags.indexOf(tagValue) === -1) {
      tags = [...tags, tagValue]
    }
    this.setState({
      tags,
      tagInputVisible: false,
      tagValue: '',
    })
  }

  // 循环tags数据
  forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault()
          this.handleClose(tag)
        }}
      >
        {tag}
      </Tag>
    )
    return (
      <span key={tag} style={{ display: 'inline-block', marginBottom: '5px' }}>
        {tagElem}
      </span>
    )
  }

  changeDate(field, moment, dateStr) {
    this.setState({
      [field]: moment,
    })
    console.log(this, field, moment, dateStr)
  }

  async submit(flag = true) {
    if (this.state.loading) return
    const { title, content, summary, coverSrc, tags } = this.state
    if (title === '') {
      message.info('请输入标题')
      return
    }
    if (content === '') {
      message.info('请输入正文')
      return
    }
    if (summary === '') {
      message.info('请输入文章概要')
      return
    }
    this.setState({
      loading: true,
    })
    try {
      await axios.post(API.addArticle, {
        title,
        content,
        summary,
        coverSrc,
        tags,
        flag,
      })
      this.setState({
        title: '',
        content: '',
        html: '',
        summary: '',
        coverSrc: '',
        tags: [],
        tagInputVisible: false,
        tagValue: '',
        loading: false,
      })
    } catch (e) {}
  }

  render() {
    const { title, content, html, coverSrc, defaultSrc, tags, tagInputVisible, tagValue, summary, loading, addTime, updTime } = this.state
    const tagChild = tags.map(this.forMap)
    return (
      <>
        <Breadcrumb className="bread-crumb">
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>添加文章</Breadcrumb.Item>
        </Breadcrumb>

        <div className="article-wrap">
          <Row style={{ height: '100%' }}>
            <Col span={18} style={{ height: '100%' }}>
              <div className="article-title">
                <span className="artilce-label">标题</span>
                <Input style={{ width: '50%' }} value={title} placeholder="请输入文章标题" onChange={(e) => this.inputValue(e, 'title')} />
              </div>
              <p className="artilce-label">正文</p>
              <div className="article-editor">
                <Input.TextArea className="article-md" value={content} style={{ width: '50%', height: '80%' }} onChange={(e) => this.mdContent(e)} />
                <div className="markdown-content" dangerouslySetInnerHTML={{ __html: html }}></div>
              </div>
            </Col>
            <Col span={5} offset={1} style={{ height: '100%' }}>
              <div className="article-btn marginb">
                <Button style={{ marginRight: '20px', flex: 1 }} loading={loading} onClick={() => this.submit(false)}>
                  暂存
                </Button>
                <Button type="primary" style={{ flex: 1 }} loading={loading} onClick={() => this.submit(true)}>
                  发布
                </Button>
              </div>
              <Input.TextArea className="marginb" placeholder="文章概要" value={summary} onChange={(e) => this.inputValue(e, 'summary')} />
              <Input.TextArea className="marginb" placeholder="文章封面地址" value={coverSrc} onChange={(e) => this.inputValue(e, 'coverSrc')} />
              <div className="list-cover marginb">
                <h2 className="blog-title">{title}</h2>
                <Image className="blog-cover" width={'100%'} src={coverSrc || defaultSrc} onError={(e) => this.imgError(e)} />
              </div>
              <div className="marginb">
                <p>标签：</p>
                {tagChild}
                {tagInputVisible && (
                  <Input
                    ref={(ele) => {
                      this.input = ele
                    }}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={tagValue}
                    onChange={(e) => this.inputValue(e, 'tagValue')}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                  />
                )}
                {!tagInputVisible && (
                  <Tag onClick={() => this.showInput()} className="site-tag-plus">
                    <PlusOutlined /> New Tag
                  </Tag>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <DatePicker
                  inputReadOnly
                  value={addTime}
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="创建时间"
                  onChange={this.changeDate.bind(this, 'addTime')}
                />
                <DatePicker
                  inputReadOnly
                  value={updTime}
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="更新时间"
                  onChange={this.changeDate.bind(this, 'updTime')}
                />
              </div>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

export default AddArticle
