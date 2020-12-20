import { Route, Switch, Redirect } from 'react-router-dom'
import routes from '../../router'

export default function App(props) {
  const render = (item, props) => {
    return <item.component {...props} children={item.children || []} />
  }

  return (
    <div className="app">
      <Switch>
        {routes.map((item, index) => {
          return <Route key={index} path={item.path} render={(props) => render(item, props)} />
        })}
      </Switch>
    </div>
  )
}
