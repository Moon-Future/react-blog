import { Row, Col } from 'antd'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Project from '../components/Project'
import BlogList from '../components/BlogList'
import Poetry from '../components/Poetry'
import KonvaImage from '../components/KonvaImage'
import { fontSizeAuto, throttle } from '../util/index'
import axios from 'axios'
import api from '../config/api'

const postVariants = {
  initial: { scale: 0.96, y: 30, opacity: 0 },
  enter: { scale: 1, y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] } },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] }
  }
}

const Home = (props) => {
  const { articleList, route } = props
  return (
    <div className="container index-container">
      <Head>
        <title>MyBlog</title>
      </Head>

      {/* <KonvaImage src={'../static/images/bg-1.jpg'}></KonvaImage> */}

      <Header route={route} />

      <div className="page-background"></div>
      <div style={{ height: '500px' }}></div>

      <Row className="comm-main comm-main-index" type="flex" justify="center">
        <Col className="comm-left" xs={0} sm={0} md={0} lg={5} xl={4} xxl={3}>
          <Author />
          <Project />
        </Col>

        <Col className="comm-center" xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
          <div className="comm-center-bg"></div>
          <motion.div initial="initial" animate="enter" exit="exit" variants={postVariants} className="comm-center-content">
            <BlogList articleList={articleList} />
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
  const result = await axios.post(api.getArticleList)
  return {
    props: { articleList: result.data }, // will be passed to the page component as props
  }
}

export default Home
