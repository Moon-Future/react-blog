import React, { Component } from 'react'
import { Breadcrumb, Input, Button, Image, Tag, Select, DatePicker, message } from 'antd'
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

const { Option } = Select

class AddArticle extends Component {
  constructor(props) {
    super(props)
    this.articleId = getUrlParam(props.location.search, 'id')
    this.userInfo = props.userInfo
    this.state = {
      title: '',
      content: '',
      html: '',
      summary: '',
      coverImg: '',
      topImg: '',
      backgroundImg: '',
      tags: [],
      categories: [],
      categorySelected: [],
      addTime: '',
      updTime: '',
      loading: false,
      previewHide: true,
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
      xhtml: false,
      highlight: function (code) {
        return hljs.highlightAuto(code).value
      },
    })
    if (this.articleId) {
      const { data } = await axios.post(API.getArticle, { id: this.articleId, edit: true })
      const categories = data.category
      const categorySelected = []
      categories.forEach(ele => {
        if (ele.selected) {
          categorySelected.push(ele.id)
        }
      })
      this.setState({
        title: data.title,
        content: data.mdContent,
        html: marked(data.mdContent),
        summary: data.summary,
        coverImg: data.cover,
        topImg: data.topImg,
        backgroundImg: data.backgroundImg,
        categories,
        categorySelected,
        tags: data.tag || [],
        addTime: moment(new Date(data.add_time)),
        updTime: moment(),
      })
    } else {
      this.getTagList()
      this.getCategoryList()
    }
  }

  inputValue(e, field) {
    this.setState({
      [field]: e.target.value.trim(),
    })
  }

  getTagList() {
    axios
      .post(API.getTagList)
      .then((res) => {
        this.setState({ tags: res.data })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  getCategoryList = () => {
    axios
      .post(API.getCategoryList)
      .then((res) => {
        this.setState({
          categories: res.data,
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  // markdown 字符串
  mdContent(e) {
    const value = e.target.value
    if (this.timer) clearTimeout(this.timer)
    if (!this.state.previewHide) {
      this.timer = setTimeout(() => {
        this.setState({
          html: marked(value),
        })
      }, 500)
    }
    this.setState({
      content: value,
    })
  }

  // 文章封面图失败是默认值
  // imgError(e) {
  //   this.setState({
  //     defaultCover: 'https://cdn.pixabay.com/photo/2020/05/06/00/15/cyberpunk-5135622__480.jpg',
  //   })
  // }

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

  changeCategory(value) {
    this.setState({
      categorySelected: value
    })
  }

  changeDate(field, moment) {
    this.setState({
      [field]: moment,
    })
  }

  // 预览隐藏
  previewMarkdown() {
    const previewHide = this.state.previewHide
    this.setState({
      previewHide: !previewHide,
    })
    if (previewHide) {
      this.timer = setTimeout(() => {
        this.setState({
          html: marked(this.state.content),
        })
      }, 500)
    }
  }

  async submit(flag = true) {
    if (this.state.loading) return
    const { title, content, summary, coverImg, topImg, backgroundImg, tags, categories, categorySelected, addTime, updTime } = this.state
    const selectedTag = []
    const tagsName = []
    const categoriesName = []
    tags.forEach((ele) => {
      if (ele.selected) {
        selectedTag.push(ele.id)
        tagsName.push(ele.name)
      }
    })
    categories.forEach((ele) => {
      if (categorySelected.includes(ele.id)) {
        categoriesName.push(ele.name)
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
    // if (summary === '') {
    //   message.info('请输入文章概要')
    //   return
    // }
    this.setState({
      loading: true,
    })
    try {
      await axios.post(API.addArticle, {
        title,
        content,
        summary,
        coverImg,
        topImg,
        backgroundImg,
        tags: selectedTag,
        tagsName,
        categories: categorySelected,
        categoriesName,
        addTime: addTime && addTime.valueOf(),
        updTime: updTime && updTime.valueOf(),
        flag,
        id: this.articleId,
        userId: this.userInfo.id,
      })
      this.props.history.push('/articleList')
    } catch (e) {
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    const { title, content, html, coverImg, topImg, backgroundImg, tags, categories, categorySelected, summary, loading, addTime, updTime, previewHide } = this.state
    const userInfo = this.userInfo
    const children = []
    for (let i = 0; i < categories.length; i++) {
      children.push(<Option key={categories[i].id}>{categories[i].name}</Option>)
    }
    return (
      <>
        <Breadcrumb className="bread-crumb">
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>添加文章</Breadcrumb.Item>
        </Breadcrumb>

        <div className="article-wrap">
          <div className="article-item article-title">
            <span className="article-label article-request">标题</span>
            <Input style={{ width: '50%' }} value={title} placeholder="请输入文章标题" allowClear onChange={(e) => this.inputValue(e, 'title')} />
          </div>
          <div className="article-item article-content">
            <div className="article-editor">
              <Input.TextArea
                className="article-md"
                value={content}
                placeholder="请输入正文"
                style={{ width: previewHide ? '100%' : '50%', height: '100%' }}
                onChange={(e) => this.mdContent(e)}
              />
              <span className="markdown-preview" onClick={() => this.previewMarkdown()}>
                {previewHide ? '预览' : '隐藏'}
              </span>
              <div className="markdown-content" style={{ display: previewHide ? 'none' : 'block' }} dangerouslySetInnerHTML={{ __html: html }}></div>
            </div>
          </div>
          <div className="article-item">
            <span className="article-label">概要</span>
            <Input style={{ width: '50%' }} value={summary} placeholder="请输入文章概要" allowClear onChange={(e) => this.inputValue(e, 'summary')} />
          </div>
          <div className="article-item">
            <span className="article-label">封面</span>
            <Input
              style={{ width: '50%' }}
              value={coverImg}
              placeholder="请输入封面地址"
              allowClear
              onChange={(e) => this.inputValue(e, 'coverImg')}
            />
          </div>
          <div className="article-item">
            <span className="article-label">顶图</span>
            <Input
              style={{ width: '50%' }}
              value={topImg}
              placeholder="请输入顶部大图地址"
              allowClear
              onChange={(e) => this.inputValue(e, 'topImg')}
            />
          </div>
          <div className="article-item">
            <span className="article-label">背景</span>
            <Input
              style={{ width: '50%' }}
              value={backgroundImg}
              placeholder="请输入背景地址"
              allowClear
              onChange={(e) => this.inputValue(e, 'backgroundImg')}
            />
          </div>
          <div className="article-item">
            <span className="article-label">类别</span>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '50%' }}
              placeholder="请选择类别"
              value={categorySelected}
              onChange={(e) => this.changeCategory(e)}
            >
              {children}
            </Select>
          </div>
          <div className="article-item">
            <span className="article-label">标签</span>
            <span>
              {tags.length ? (
                tags.map((ele) => {
                  return (
                    <Tag
                      color={ele.background}
                      style={{ color: ele.color, cursor: 'pointer', marginBottom: '10px' }}
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
            </span>
          </div>
          <div className="article-item">
            <span className="article-label">创建</span>
            <DatePicker
              inputReadOnly
              value={addTime}
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder="创建时间"
              onChange={this.changeDate.bind(this, 'addTime')}
            />
          </div>
          <div className="article-item">
            <span className="article-label">更新</span>
            <DatePicker
              inputReadOnly
              value={updTime}
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder="更新时间"
              onChange={this.changeDate.bind(this, 'updTime')}
            />
          </div>
          <div className="article-item article-btn">
            <Button style={{ marginRight: '20px', flex: 1 }} loading={loading} onClick={() => this.submit(false)}>
              暂存
            </Button>
            {userInfo.root && (
              <Button type="primary" style={{ flex: 1 }} loading={loading} onClick={() => this.submit(true)}>
                发布
              </Button>
            )}
          </div>
          <div className="article-item article-preview">
            {coverImg ? (
              <div className="preview-wrapper">
                <span className="preview-title">封面</span>
                <Image width={'200px'} src={coverImg} />
              </div>
            ) : (
              ''
            )}
            {topImg ? (
              <div className="preview-wrapper">
                <span className="preview-title">顶图</span>
                <Image width={'200px'} src={topImg} />
              </div>
            ) : (
              ''
            )}
            {backgroundImg ? (
              <div className="preview-wrapper">
                <span className="preview-title">背景</span>
                <Image width={'200px'} src={backgroundImg} />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </>
    )
  }
}

export default AddArticle
