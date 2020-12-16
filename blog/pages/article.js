import { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Project from '../components/Project'
import BlogList from '../components/BlogList'
import Poetry from '../components/Poetry'
import PoetrySentence from '../components/PoetrySentence'
import '../static/style/pages/article.less'
import axios from 'axios'
import api from '../config/api'

const postVariants = {
  initial: { scale: 0.96, y: 30, opacity: 0 },
  enter: { scale: 1, y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] } },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  },
}

const sentenceVariants = {
  initial: { scale: 0.96, opacity: 1 },
  exit: {
    scale: 0.6,
    y: 100,
    x: -300,
    opacity: 0,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  },
}

const Article = (props) => {
  const { articleList, route } = props
  const [poetry, setPoetry] = useState(null)
  const [value, setValue] = useState(0)

  const getPoetry = (data) => {
    setPoetry(data)
  }

  useEffect(() => {
    let timer = setInterval(() => {
      setValue(value + 1)
      if (value > 10) {
        clearInterval(timer)
      }
    }, 500);
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="container article-container">
      <Head>
        <title>学无止境，厚积薄发</title>
      </Head>

      <Header route={route} />

      <div className="page-background"></div>
      <div style={{ height: '500px' }}></div>

      <Row className="comm-main comm-main-index" type="flex" justify="center">
        <Col className="comm-left" xs={0} sm={0} md={0} lg={5} xl={4} xxl={3}>
          <Author />
          <Project />
          <Poetry poetry={poetry} />
        </Col>

        <Col className="comm-center" xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
          <p>{value}</p>
          <motion.div className="sentence-wrap" initial="initial" animate="enter" exit="exit" variants={sentenceVariants}>
            <PoetrySentence staticFlag={true} handlePoetry={getPoetry} />
          </motion.div>
          <div className="comm-center-bg"></div>
          <motion.div initial="initial" animate="enter" exit="exit" variants={postVariants} className="comm-center-content">
            <BlogList articleList={articleList} />
          </motion.div>
        </Col>
      </Row>
    </div>
  )
}

export async function getStaticProps(context) {
  try {
    const result = await axios.post(api.getArticleList)
    return {
      props: { articleList: result.data }, // will be passed to the page component as props
    }
  } catch (e) {
    return {
      props: { articleList: [] }, // will be passed to the page component as props
    }
  }
}

export default Article
