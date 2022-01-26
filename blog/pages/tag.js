import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import AsideCard from '../components/AsideCard'
import Pagination from '../components/Pagination'
import TimelineList from '../components/TimelineList'
import '../static/style/pages/index.less'
import axios from 'axios'
import { SSRAPI, API } from '../config/api'

const TagPage = (props) => {
  const { articleList, tags, categories, count, recentArticle, id } = props
  const [current, setCurrent] = useState(props.current)
  const [pageData, setPageData] = useState({
    title: '标签',
    type: '3',
    typeName: '',
    typeList: tags,
    count,
    articleList
  })

  useEffect(() => {
    const result = tags.find((ele) => {
      return ele.id === id
    })
    const tagName = result && result.name || ''
    const dataList = formatData(articleList)
    setPageData({
      ...pageData,
      count,
      typeName: tagName,
      articleList: dataList
    })
  }, [id])

  const formatData = (data) => {
    const keys = []
    const dataMap = {}
    const articleList = []
    data.forEach(ele => {
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
    keys.forEach(ele => {
      articleList.push({type: 'date', year: ele}, ...dataMap[ele])
    })
    return articleList
  }

  const onChangePage = (page) => {
    setCurrent(page)
    getArticleList(page)
  }

  const getArticleList = async (page) => {
    const result = await axios.post(API.getArticleData, { page: page })
    const dataList = formatData(result.data.articleList)
    setPageData({
      ...pageData,
      articleList: dataList
    })
  }

  return (
    <div className="container index-container">
      <Layout pageDesc="标签">
        <TimelineList pageData={pageData} key="main" />
        <AsideCard tags={tags} categories={categories} recentArticle={recentArticle} key="aside" />
        {
          id ? <Pagination count={count} current={current} onChangePage={onChangePage} key="pagination" /> : ''
        }
      </Layout>
    </div>
  )
}

TagPage.getLayout = (page) => {
  return page
}

export async function getServerSideProps(context) {
  try {
    const page = 1
    const id = context.query.id || ''
    const result = await axios.post(SSRAPI.getHomeData, { page, tagId: id })
    return {
      props: { ...result.data, current: page, id }, // will be passed to the page component as props
    }
  } catch (e) {
    return {
      props: { articleList: [], tags: [], categories: [], count: 0, current: 1, recentArticle: [] } // will be passed to the page component as props
    }
  }
}

export default TagPage
