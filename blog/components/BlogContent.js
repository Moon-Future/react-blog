import React, { useState } from 'react'
import Link from 'next/link'
import { Breadcrumb } from 'antd'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const BlogContent = (props) => {
  const [content] = useState(props.content)
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
          <Breadcrumb.Item>
            <Link href="/">文章列表</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>大大撒旦</Breadcrumb.Item>
        </Breadcrumb>
      </div> */}

      <div className="markdown-content" dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
    </>
  )
}

export default BlogContent
