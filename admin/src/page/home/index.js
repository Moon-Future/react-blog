import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import './index.scss'
import SideBar from '../../components/sidebar'
import ArticleList from '../articleList'

const { Header, Sider, Content } = Layout

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <Layout className="container">
          <Sider><SideBar /></Sider>
          <Layout>
            <Header>Header</Header>
            <Content className="content">
              <Switch>
                <Route path='/articleList' component={ArticleList} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </>
    )
  }
}

export default Home
