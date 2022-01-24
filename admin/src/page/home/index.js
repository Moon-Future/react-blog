import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import './index.scss'
import SideBar from '../../components/sidebar'
import TopHeader from '../../components/header'

const { Header, Sider, Content } = Layout

export default function Home(props) {
  const { location } = props
  const routes = props.children || []

  const render = (item) => {
    return <item.component {...props} />
  }

  return (
    <>
      <Layout className="container">
        <Sider className="sider-container">
          <SideBar pathname={location.pathname} />
        </Sider>
        <Layout className="layout-container">
          <Header className="header"><TopHeader {...props} /></Header>
          <Content className="content">
            <Switch>
              {routes.map((item, index) => {
                return <Route key={index} path={item.path} render={() => render(item)} />
              })}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
