import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import './index.scss'
import SideBar from '../../components/sidebar'
import Welcome from '../welcome'
import ArticleList from '../articleList'
import AddArticle from '../addArticle'

const { Header, Sider, Content } = Layout

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <Layout className="container">
          <Sider>
            <SideBar />
          </Sider>
          <Layout>
            <Header className="header">Header</Header>
            <Content className="content">
              <Switch>
                <Route path="/articleList" component={ArticleList} />
                <Route path="/addArticle" component={AddArticle} />
                <Route path="/" component={Welcome} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </>
    )
  }
}

export default Home
