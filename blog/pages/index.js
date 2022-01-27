
import '../static/style/pages/index.less'
import { useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import AsideCard from '../components/AsideCard'
import Pagination from '../components/Pagination'
import BlogList from '../components/BlogList'
import { SSRAPI, API } from '../config/api'

const Home = (props) => {
  const { tags, categories, count, recentArticle } = props
  const [articleList, setArticleList] = useState(props.articleList)
  const [current, setCurrent] = useState(props.current)

  const onChangePage = (page) => {
    setCurrent(page)
    getArticleList(page)
  }

  const getArticleList = async (page) => {
    const result = await axios.post(API.getArticleData, { page: page })
    setArticleList(result.data.articleList)
  }

  return (
    <div className="container index-container">
      <Layout homeFlag={true}>
        <BlogList articleList={articleList} key="main" />
        <AsideCard tags={tags} categories={categories} recentArticle={recentArticle} key="aside" />
        <Pagination count={count} current={current} onChangePage={onChangePage} seoShow key="pagination" />
      </Layout>
    </div>
  )
}

Home.getLayout = (page) => {
  return page
}

export async function getServerSideProps(context) {
  try {
    const page = context.query.page ? Number(context.query.page) : 1
    if (isNaN(page)) {
      return {
        props: { articleList: [], tags: [], categories: [], count: 0, current: 1, recentArticle: [] }
      }
    }
    const result = await axios.post(SSRAPI.getHomeData, { page })
    return {
      props: { ...result.data, current: page }, // will be passed to the page component as props
    }
  } catch (e) {
    return {
      props: { articleList: [], tags: [], categories: [], count: 0, current: 1, recentArticle: [] } // will be passed to the page component as props
    }
  }
}

export default Home
