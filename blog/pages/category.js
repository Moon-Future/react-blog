import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import PoetrySentence from '../components/PoetrySentence'
import Layout from '../components/Layout'
import AsideCard from '../components/AsideCard'
import Pagination from '../components/Pagination'
import TimelineList from '../components/TimelineList'
import '../static/style/pages/index.less'
import { createFromIconfontCN } from '@ant-design/icons'
import axios from 'axios'
import { SSRAPI, API } from '../config/api'

const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2220107_frnkhisqosw.js', // 在 iconfont.cn 上生成
})

const Home = (props) => {
  const [articleList, setArticleList] = useState(props.articleList)
  const [current, setCurrent] = useState(props.current)
  const { tags, categories, count, recentArticle } = props
  console.log('category', props)

  useEffect(() => {
    console.log('category useEffect')
  }, [])

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
      <Head>
        <title>欢迎来到我的世界</title>
      </Head>

      <div>category</div>

      <Layout
        top={
          <div className="page-background">
            <div className="page-content">
              <span className="blog-desc">沉淀酝酿，厚积薄发</span>
              <PoetrySentence />
            </div>
            <div className="scroll-down">
              <MyIcon type="icon-scroll-down" />
            </div>
          </div>
        }
        main={<TimelineList articleList={articleList} />}
        aside={<AsideCard tags={tags} categories={categories} recentArticle={recentArticle} />}
        pagination={<Pagination count={count} current={current} onChangePage={onChangePage} />}
      >
      </Layout>
    </div>
  )
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
