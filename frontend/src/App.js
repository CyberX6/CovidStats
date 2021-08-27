import { Auth } from './components/Auth'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Table } from './components/Table'
import { Login } from './components/Login'

const App = () => {
  return (
    <BrowserRouter className="App">
      <Auth />
      <Switch>
        <Route path="/" exact>
          <Table />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/table">
          <Table />
        </Route>
        <Route path="*">
          <Table />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
