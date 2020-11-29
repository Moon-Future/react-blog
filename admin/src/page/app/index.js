import { Route, Switch } from 'react-router-dom'
import Home from '../home'
import Login from '../login'

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  )
}

export default App
