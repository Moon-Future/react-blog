import { Row, Col, Tag } from 'antd'
import { CalendarTwoTone, EyeTwoTone } from '@ant-design/icons'
import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Project from '../components/Project'
import BlogContent from '../components/BlogContent'
import Poetry from '../components/Poetry'
import KonvaImage from '../components/KonvaImage'
import '../static/style/pages/detailed.scss'
import { formatTime } from '../util/index'
import axios from 'axios'
import api from '../config/api'

const Home = (data) => {
  const { articleDetail } = data
  return (
    <div className="container detailed-container">
      <Head>
        <title>MyBlog</title>
      </Head>

      <Header />

      <div className="article-cover" style={{ backgroundImage: articleDetail.cover ? `url(${articleDetail.cover})` : '' }}>
        <Row className="detail-row" type="flex" justify="center">
          <Col xs={0} sm={0} md={0} lg={5} xl={4} xxl={3}></Col>
          <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
            <p className="title">{articleDetail.title}</p>
            <p className="info">
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
            </p>
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
            <BlogContent content={articleDetail.mdContent} />
          </div>
        </Col>

        {/* <Col className="comm-right" xs={0} sm={0} md={0} lg={0} xl={4} xxl={3}>
        <Poetry />
      </Col> */}
      </Row>
    </div>
  )
}

Home.getInitialProps = async (context) => {
  const id = context.query.id
  const promise = new Promise((resolve) => {
    axios.post(api.getArticle, { id }).then((res) => {
      resolve(res.data)
    })
  })

  return { articleDetail: await promise }
}

export default Home
