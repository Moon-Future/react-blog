import React, { useState } from 'react'
import Head from 'next/head'
import PoetrySentence from '../components/PoetrySentence'
import Layout from '../components/Layout'
import AsideCard from '../components/AsideCard'
import Pagination from '../components/Pagination'
import '../static/style/pages/index.less'
import { createFromIconfontCN } from '@ant-design/icons'
import axios from 'axios'
import { API } from '../config/api'
import BlogList from '../components/BlogList'
import TimelineList from '../components/TimelineList'

const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2220107_frnkhisqosw.js', // 在 iconfont.cn 上生成
})

const PageComponent = (props) => {
  const [articleList, setArticleList] = useState(props.articleList)
  const [current, setCurrent] = useState(props.current)
  const { tags, categories, count, recentArticle } = props

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
        main={() => {
          switch(props.main) {
            case 'index':
              return <BlogList articleList={articleList} />
            case 'category':
              return <TimelineList articleList={articleList} />
          }
        }}
        aside={<AsideCard tags={tags} categories={categories} recentArticle={recentArticle} />}
        pagination={<Pagination count={count} current={current} onChangePage={onChangePage} />}
      >
      </Layout>
    </div>
  )
}

export default PageComponent
