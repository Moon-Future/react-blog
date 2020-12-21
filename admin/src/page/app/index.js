import { Route, Switch, Redirect } from 'react-router-dom'
import routes from '../../router'

export default function App(props) {

  const renderRouteContent = (item, props) => {
    let userInfo = null
    if (localStorage.getItem('token') && localStorage.getItem('userInfo')) {
      userInfo = JSON.parse(localStorage.getItem('userInfo'))
    }
    if (userInfo || item.path === '/login') {
      return <item.component {...props} userInfo={userInfo} children={item.children || []} />
    }
    return <Redirect to="/login" />
  }

  return (
    <div className="app">
      <Switch>
        {routes.map((item, index) => {
          return <Route key={index} path={item.path} render={(props) => renderRouteContent(item, props)} />
        })}
      </Switch>
    </div>
  )
}
