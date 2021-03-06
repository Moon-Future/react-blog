import React, { useState } from 'react'
import Link from 'next/link'
import { List, Breadcrumb, Image, Tag } from 'antd'
import '../static/style/components/blogList.less'
import { CalendarTwoTone, EyeTwoTone, TagTwoTone } from '@ant-design/icons'
import { formatTime } from '../util/index'
import marked from 'marked'
import hljs from 'highlight.js'

const BlogList = (props) => {
  const [articleList] = useState(props.articleList)

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

  return (
    <>
      {/* <div className="bread-div">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>文章列表</Breadcrumb.Item>
        </Breadcrumb>
      </div> */}

      <List
        itemLayout="vertical"
        dataSource={articleList}
        renderItem={(item) => (
          <List.Item>
            <Link href={'/detailed?id=' + item.id}>
              <div className="list-title">{item.title}</div>
            </Link>
            <div className="list-icon">
              <span>
                <CalendarTwoTone />
                {formatTime(item.add_time, 'yyyy-MM-dd hh:mm')}
              </span>
              <span>
                <EyeTwoTone />
                {item.view} 人
              </span>
              <span>
                <TagTwoTone />
                {item.tag.map((ele) => (
                  <Tag key={ele.name} color={ele.background} style={{ color: ele.color }}>
                    {ele.name}
                  </Tag>
                ))}
              </span>
            </div>
            <Link href={'/detailed?id=' + item.id}>
              <div className="list-cover">
                <h2 className="blog-title">{item.title}</h2>
                <div className="blog-cover">
                  <Image width={'100%'} preview={false} src={item.cover} />
                </div>
              </div>
            </Link>
            <div className="markdown-content list-summary" dangerouslySetInnerHTML={{ __html: marked(item.summary) }}></div>
          </List.Item>
        )}
      />
    </>
  )
}

export default BlogList
