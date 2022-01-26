import Layout from '../components/Layout'
import marked from 'marked'
import hljs from 'highlight.js'
import '../static/style/pages/detailed.less'
import 'highlight.js/styles/monokai-sublime.css'
import axios from 'axios'
import { SSRAPI } from '../config/api'

const Detailed = (props) => {
  const { articleDetail } = props
  const cover = articleDetail.cover
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
  

  return (
    <div className="container detailed-container">
      <Layout>
        <div className="detailed-cover" style={{ backgroundImage: `url(${cover})` }} key="top">
            
        </div>
        <div className="markdown-content card-box" dangerouslySetInnerHTML={{ __html: html }} key="main"></div>
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
    const result = await axios.post(SSRAPI.getArticle, { id })
    return {
      props: { articleDetail: result.data }, // will be passed to the page component as props
    }
  } catch (e) {
    return {
      props: { articleDetail: { mdContent: '' } }, // will be passed to the page component as props
    }
  }
}

export default Detailed
