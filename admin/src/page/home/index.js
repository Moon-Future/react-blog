import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import './index.scss'
import SideBar from '../../components/sidebar'

const { Header, Sider, Content } = Layout

export default function Home(props) {
  const { location } = props
  const routes = props.children || []

  const render = (item, props) => {
    return <item.component {...props} />
  }

  return (
    <>
      <Layout className="container">
        <Sider>
          <SideBar pathname={location.pathname} />
        </Sider>
        <Layout>
          <Header className="header">Header</Header>
          <Content className="content">
            <Switch>
              {routes.map((item, index) => {
                return <Route key={index} path={item.path} render={(props) => render(item, props)} />
              })}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
