import { Route, Switch } from 'react-router-dom'
import Home from '../home'

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path='/' component={Home} />
        <Route path='/about' component={Home} />
      </Switch>
    </div>
  );
}

export default App
