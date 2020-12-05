import { Row, Col } from 'antd'

import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Project from '../components/Project'
import BlogContent from '../components/BlogContent'
import Poetry from '../components/Poetry'
import KonvaImage from '../components/KonvaImage'
import '../static/style/pages/detailed.scss'

const Home = () => (
  <div className="container detailed-container">
    <Head>
      <title>MyBlog</title>
    </Head>

    <Header />

    <div className="article-cover">
      <Row className="detail-row" type="flex" justify="center">
        <Col xs={0} sm={0} md={0} lg={5} xl={4} xxl={3}></Col>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
          <p className="title">P01:课程介绍和环境搭建</p>
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
        <div className="comm-center-content">
          <BlogContent />
        </div>
      </Col>

      {/* <Col className="comm-right" xs={0} sm={0} md={0} lg={0} xl={4} xxl={3}>
        <Poetry />
      </Col> */}
    </Row>
  </div>
)

export default Home
