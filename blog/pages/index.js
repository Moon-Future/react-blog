import { Row, Col } from 'antd'

import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import BlogList from '../components/BlogList'
import Poetry from '../components/Poetry'
import '../static/style/pages/index.css'

const Home = () => (
  <div className="container">
    <Head>
      <title>MyBlog</title>
    </Head>

    <Header />

    <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={0} sm={0} md={0} lg={5} xl={4} xxl={3}>
        <Author />
      </Col>

      <Col className="comm-center" xs={24} sm={24} md={24} lg={15} xl={12} xxl={12}>
        <div className="comm-center-bg"></div>
        <div className="comm-center-content">
          <BlogList />
        </div>
      </Col>

      <Col className="comm-right" xs={0} sm={0} md={0} lg={0} xl={4} xxl={3}>
        <Poetry />
      </Col>
    </Row>
  </div>
)

export default Home
