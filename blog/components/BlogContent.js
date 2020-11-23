import React, { useState } from 'react'
import Link from 'next/link'
import { Breadcrumb } from 'antd'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import '../static/style/components/blogContent.scss'

const BlogContent = () => {
  const [content, setContent] = useState(
    '# P01:课程介绍和环境搭建\n' +
      '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
      '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
      '**这是加粗的文字**\n\n' +
      '*这是倾斜的文字*`\n\n' +
      '***这是斜体加粗的文字***\n\n' +
      '~~这是加删除线的文字~~ \n\n' +
      '`console.log(111)` \n\n' +
      '# p02:来个Hello World 初始Vue3.0\n' +
      '> aaaaaaaaa\n' +
      '>> bbbbbbbbb\n' +
      '>>> cccccccccc\n' +
      '***\n\n\n' +
      '# p03:Vue3.0基础知识讲解\n' +
      '> aaaaaaaaa\n' +
      '>> bbbbbbbbb\n' +
      '>>> cccccccccc\n\n' +
      '# p04:Vue3.0基础知识讲解\n' +
      '> aaaaaaaaa\n' +
      '>> bbbbbbbbb\n' +
      '>>> cccccccccc\n\n' +
      '#5 p05:Vue3.0基础知识讲解\n' +
      '> aaaaaaaaa\n' +
      '>> bbbbbbbbb\n' +
      '>>> cccccccccc\n\n' +
      '# p06:Vue3.0基础知识讲解\n' +
      '> aaaaaaaaa\n' +
      '>> bbbbbbbbb\n' +
      '>>> cccccccccc\n\n' +
      '# p07:Vue3.0基础知识讲解\n' +
      '> aaaaaaaaa\n' +
      '>> bbbbbbbbb\n' +
      '>>> cccccccccc\n\n' +
      '```js var a=11; router.get("/getSession", async (ctx) => { })```'
  )
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
      <div className="bread-div">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href="/">文章列表</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>大大撒旦</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="markdown-content" dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
    </>
  )
}

export default BlogContent
