import React from 'react'
import { BrowserRouter, Link, NavLink, Route, Switch } from 'react-router-dom'
import Home from './Home';
import { Button } from '@material-ui/core'

function App() {

  function checkLoggedIn() {
    return false;
  }

  function navLoggedIn() {

  }
  function navNotLoggedIn() {
    return
  }

  return (
    <BrowserRouter>
      {checkLoggedIn() ? navLoggedIn() : navNotLoggedIn()}
      <Button variant="contained">Default</Button>

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
