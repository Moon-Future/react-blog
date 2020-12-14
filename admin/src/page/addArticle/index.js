import React, { Component } from 'react'
import { Breadcrumb, Input, Row, Col, Button, Image, Tag, DatePicker, message } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import moment from 'moment'
import { Link } from 'react-router-dom'
import './index.scss'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import axios from '../../util/axios'
import { getUrlParam } from '../../util/index'
import API from '../../config/api'

class AddArticle extends Component {
  constructor(props) {
    super(props)
    this.articleId = getUrlParam(props.location.search, 'id')
    this.state = {
      title: '',
      content: '',
      html: '',
      summary: '',
      coverSrc: '',
      defaultSrc: 'https://cdn.pixabay.com/photo/2020/05/06/00/15/cyberpunk-5135622__480.jpg',
      tags: [],
      addTime: '',
      updTime: '',
      loading: false,
    }
  }

  async componentDidMount() {
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
    if (this.articleId) {
      const { data } = await axios.post(API.getArticle, { id: this.articleId, allTag: true })
      this.setState({
        title: data.title,
        content: data.mdContent,
        html: marked(data.mdContent),
        summary: data.summary,
        coverSrc: data.cover,
        tags: data.tag || [],
        addTime: moment(new Date(data.add_time)),
        updTime: moment(),
      })
    } else {
      this.getTagList()
    }
  }

  inputValue(e, field) {
    this.setState({
      [field]: e.target.value.trim(),
    })
  }

  getTagList() {
    axios.post(API.getTagList).then((res) => {
      this.setState({ tags: res.data })
    }).catch(e => {
      console.log(e)
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

  // 选择标签
  selectTag(tag) {
    const { tags } = this.state
    for (let i = 0, len = tags.length; i < len; i++) {
      if (tags[i].id === tag.id) {
        tags[i].selected = !tags[i].selected
        break
      }
    }
    this.setState({ tags })
  }

  changeDate(field, moment, dateStr) {
    this.setState({
      [field]: moment,
    })
  }

  async submit(flag = true) {
    if (this.state.loading) return
    const { title, content, summary, coverSrc, tags, addTime, updTime } = this.state
    const selectedTag = []
    tags.forEach((ele) => {
      if (ele.selected) {
        selectedTag.push(ele.id)
      }
    })
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
        tags: selectedTag,
        addTime: addTime && addTime.valueOf(),
        updTime: updTime && updTime.valueOf(),
        flag,
        id: this.articleId,
      })
      if (this.articleId) {
        this.props.history.goBack()
        return
      }
      this.setState({
        title: '',
        content: '',
        html: '',
        summary: '',
        coverSrc: '',
        addTime: '',
        uodTIme: '',
        tagInputVisible: false,
        tagValue: '',
        loading: false,
      })
    } catch (e) {
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    const { title, content, html, coverSrc, defaultSrc, tags, summary, loading, addTime, updTime } = this.state
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
                <span className="article-label">标题</span>
                <Input style={{ width: '50%' }} value={title} placeholder="请输入文章标题" onChange={(e) => this.inputValue(e, 'title')} />
              </div>
              <p className="article-label">正文</p>
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
              <div className="blog-cover-wrap marginb">
                <h2 className="blog-title">{title}</h2>
                <Image className="blog-cover" width={'100%'} src={coverSrc || defaultSrc} onError={(e) => this.imgError(e)} />
              </div>
              <div className="marginb">
                <p>
                  选择标签：
                  {tags.length ? (
                    tags.map((ele) => {
                      return (
                        <Tag
                          color={ele.background}
                          style={{ color: ele.color, cursor: 'pointer' }}
                          icon={ele.selected ? <CheckOutlined /> : ''}
                          key={ele.name}
                          onClick={() => this.selectTag(ele)}
                        >
                          {ele.name}
                        </Tag>
                      )
                    })
                  ) : (
                    <span>暂无标签</span>
                  )}
                </p>
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
