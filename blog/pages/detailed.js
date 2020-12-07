import React from 'react'
import { Row, Col, Tag } from 'antd'
import { CalendarTwoTone, EyeTwoTone } from '@ant-design/icons'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Project from '../components/Project'
import BlogContent from '../components/BlogContent'
import Poetry from '../components/Poetry'
import KonvaImage from '../components/KonvaImage'
import { formatTime } from '../util/index'
import axios from 'axios'
import api from '../config/api'

const postVariants = {
  initial: { x: 1000, opacity: 0 },
  enter: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] } },
  exit: {
    x: 1000,
    opacity: 0,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] }
  }
}

const titleVariants = {
  initial: { x: 500, opacity: 0 },
  enter: { x: 0, opacity: 1, transition: { duration: 1, ease: [0.48, 0.15, 0.25, 0.96] } }
}

const infoVariants = {
  initial: { y: 50, opacity: 0 },
  enter: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.48, 0.15, 0.25, 0.96] } }
}

const Home = (props) => {
  const { articleDetail, route } = props
  return (
    <div className="container detailed-container">
      <Head>
        <title>MyBlog</title>
      </Head>

      <Header route={route} />

      <div className="article-cover" style={{ backgroundImage: articleDetail.cover ? `url(${articleDetail.cover})` : '' }}>
        <Row className="detail-row" type="flex" justify="center">
          <Col xs={0} sm={0} md={0} lg={5} xl={4} xxl={3}></Col>
          <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
            <motion.p className="title" initial="initial" animate="enter" exit="exit" variants={titleVariants}>{articleDetail.title}</motion.p>
            <motion.p className="info" initial="initial" animate="enter" exit="exit" variants={infoVariants}>
              <span>
                {articleDetail.tag.map((ele) => (
                  <Tag key={ele.name} color={ele.background} style={{ color: ele.color }}>
                    {ele.name}
                  </Tag>
                ))}
              </span>
              <span>
                <CalendarTwoTone />
                {formatTime(articleDetail.add_time, 'yyyy-MM-dd hh:mm')}
              </span>
              <span>
                <EyeTwoTone />
                {articleDetail.view} 人
              </span>
            </motion.p>
          </Col>
        </Row>
      </div>

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={0} sm={0} md={0} lg={5} xl={4} xxl={3}>
          <Author />
          <Project />
        </Col>

        <Col className="comm-center" xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
          <div className="comm-center-bg"></div>
          <motion.div initial="initial" animate="enter" exit="exit" variants={postVariants} className="comm-center-content">
            <BlogContent content={articleDetail.mdContent} />
          </motion.div>
        </Col>

        {/* <Col className="comm-right" xs={0} sm={0} md={0} lg={0} xl={4} xxl={3}>
        <Poetry />
      </Col> */}
      </Row>
    </div>
  )
}

export async function getServerSideProps(context) {
  const id = context.query.id
  const result = await axios.post(api.getArticle, { id })
  return {
    props: { articleDetail: result.data }, // will be passed to the page component as props
  }
}

export default Home
