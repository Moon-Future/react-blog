import '../static/style/pages/index.less'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import AsideCard from '../components/AsideCard'
import Pagination from '../components/Pagination'
import TimelineList from '../components/TimelineList'
import { SSRAPI, API } from '../config/api'

const pageSize = 10

const ArchivePage = (props) => {
  const { articleList, tags, categories, count, recentArticle } = props
  const [current, setCurrent] = useState(props.current)
  const [pageData, setPageData] = useState({
    title: '文章总览',
    type: '1',
    typeName: '',
    typeList: tags,
    count,
    articleList,
  })

  useEffect(() => {
    const dataList = formatData(articleList)
    setPageData({
      ...pageData,
      count,
      articleList: dataList,
    })
  }, [])

  const formatData = (data) => {
    const keys = []
    const dataMap = {}
    const articleList = []
    data.forEach((ele) => {
      const date = new Date(ele.add_time)
      const year = date.getFullYear()
      if (dataMap[year]) {
        dataMap[year].push(ele)
      } else {
        dataMap[year] = [ele]
        keys.push(year)
      }
    })
    keys.sort((a, b) => {
      return b - a
    })
    keys.forEach((ele) => {
      articleList.push({ type: 'date', year: ele }, ...dataMap[ele])
    })
    return articleList
  }

  const onChangePage = (page) => {
    setCurrent(page)
    getArticleList(page)
  }

  const getArticleList = async (page) => {
    const result = await axios.post(API.getArticleData, { page: page, pageSize })
    const dataList = formatData(result.data.articleList)
    setPageData({
      ...pageData,
      articleList: dataList,
    })
  }

  return (
    <div className="container index-container">
      <Layout pageDesc="文档">
        <TimelineList pageData={pageData} key="main" />
        <AsideCard tags={tags} categories={categories} recentArticle={recentArticle} key="aside" />
        <Pagination count={count} current={current} pageSize={pageSize} onChangePage={onChangePage} key="pagination" />
      </Layout>
    </div>
  )
}

ArchivePage.getLayout = (page) => {
  return page
}

export async function getServerSideProps(context) {
  try {
    const page = 1
    const result = await axios.post(SSRAPI.getHomeData, { page, pageSize })
    return {
      props: { ...result.data, current: page }, // will be passed to the page component as props
    }
  } catch (e) {
    return {
      props: { articleList: [], tags: [], categories: [], count: 0, current: 1, recentArticle: [] }, // will be passed to the page component as props
    }
  }
}

export default ArchivePage
