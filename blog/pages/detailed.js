import 'highlight.js/styles/monokai-sublime.css'
import '../static/style/pages/detailed.less'
import Link from 'next/link'
import marked from 'marked'
import hljs from 'highlight.js'
import axios from 'axios'
import Layout from '../components/Layout'
import AsideCard from '../components/AsideCard'
import { SSRAPI } from '../config/api'
import { formatTime, MyIcon } from '../util'

const Detailed = (props) => {
  const { articleDetail, recentArticle } = props
  const renderer = new marked.Renderer()
  const catalogData = []
  let index = 0
  renderer.heading = function (text, level, raw) {
    let anchor = `toc${level}${++index}`
    if (level !== 1) {
      catalogData.push({
        text,
        level,
        anchor,
      })
    }
    return `<p id="${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></p>\n`
  }
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
  const html = marked(articleDetail.mdContent)
  

  const cover = articleDetail.cover
  return (
    <div className="container detailed-container">
      <Layout catalogData={catalogData}>
        <div className="detailed-cover" style={{ backgroundImage: `url(${cover})` }} key="top">
          <span className="detailed-title ellipsis-txt">{articleDetail.title}</span>
          <div>
            <span><MyIcon type="icon-calendar1" /> 发表于 {formatTime(articleDetail.add_time, 'yyyy-MM-dd hh:mm')}</span>
            {
              articleDetail.category && articleDetail.category.length ? (
                <>
                  <span className="detailed-meta-separator">|</span>
                  <span>
                    <MyIcon type="icon-category" />
                    {articleDetail.category.map((ele) => (
                      <span className="detailed-meta-tag" key={ele.id}>
                        <Link href={'/category?id=' + articleDetail.id}>{ele.name}</Link>
                      </span>
                    ))}
                  </span>
                </>
              ) : ''
            }
          </div>
          <span><MyIcon type="icon-eye" /> 阅读量：{articleDetail.view}</span>
        </div>
        <div className="markdown-content card-box" dangerouslySetInnerHTML={{ __html: html }} key="main"></div>
        <AsideCard recentArticle={recentArticle} catalogData={catalogData} key="aside" />
      </Layout>
    </div>
  )
}

Detailed.getLayout = (page) => {
  return page
}

export async function getServerSideProps(context) {
  try {
    const id = context.query.id
    const result = await axios.post(SSRAPI.getArticleDetailed, { id })
    const data = result.data
    return {
      props: { articleDetail: data.articleDetail, recentArticle: data.recentArticle }, // will be passed to the page component as props
    }
  } catch (e) {
    return {
      props: { articleDetail: { mdContent: '' } }, // will be passed to the page component as props
    }
  }
}

export default Detailed
