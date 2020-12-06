import { Row, Col } from 'antd'

import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Project from '../components/Project'
import BlogList from '../components/BlogList'
import Poetry from '../components/Poetry'
import KonvaImage from '../components/KonvaImage'
import '../static/style/pages/index.scss'
import axios from 'axios'
import api from '../config/api'

const Home = (data) => {
  return (
    <div className="container">
      <Head>
        <title>MyBlog</title>
      </Head>

      {/* <KonvaImage src={'../static/images/bg-1.jpg'}></KonvaImage> */}

      <Header />

      <div className="page-background"></div>

      <Row className="comm-main comm-main-index" type="flex" justify="center">
        <Col className="comm-left" xs={0} sm={0} md={0} lg={5} xl={4} xxl={3}>
          <Author />
          <Project />
        </Col>

        <Col className="comm-center" xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
          <div className="comm-center-bg"></div>
          <div className="comm-center-content">
            <BlogList articleList={data.articleList} />
          </div>
        </Col>

        {/* <Col className="comm-right" xs={0} sm={0} md={0} lg={0} xl={4} xxl={3}>
          <Poetry />
        </Col> */}
      </Row>
    </div>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios.post(api.getArticleList).then((res) => {
      resolve(res.data)
    })
  })

  return { articleList: await promise }
}

export default Home
