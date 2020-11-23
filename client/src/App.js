import React, { useState, useEffect } from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom'
import CatProfile from './profiles/CatProfile';
import UserProfile from './profiles/UserProfile';
import Home from './landings/Home'
import CatResults from './landings/Search/CatResults';
import Search from './landings/Search/Search';
import Login from './landings/account/Login';
import RegisterContainer from './landings/account/RegisterContainer';
import Dashboard from './landings/dashboard/Dashboard';
import PrivateRoute from './private/PrivateRoute';
import LogOut from './private/LogOut';
import { decode } from "jsonwebtoken";

function App() {
  const [valid, setValid] = useState({
    valid: false,
    refreshed: true,
  });

  useEffect(() => {
    function checkLoggedIn() {
      let token = localStorage.getItem('token');

      if (token !== null) {
        let user = decode(token);
        if (user.user) {
          return setValid({
            valid: true,
            refreshed: false,
          });
        }
      }
      return setValid({
        valid: false,
        refreshed: false,
      });
    }
    checkLoggedIn()
  }, [])

  /* show this navbar when logged in */
  function navLoggedIn() {
    return (
      <Navbar bg="light" expand="lg">
        <NavLink className="navbar-brand" to="/">CatMeownity</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink to="/dashboard" className="btn btn-success mx-2">Dashboard</NavLink>
            <NavLink to="/search" className="btn btn-outline-success mx-2">Search</NavLink>
            <NavLink to="/logout" className='btn btn-warning mx-2'>Log Out</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
  /* show this navbar when NOT logged in */
  function navNotLoggedIn() {
    return (
      <Navbar bg="light" expand="lg">
        <NavLink className="navbar-brand" to="/">CatMeownity</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Button variant="outline-dark" className="mr-3 my-1" href="/login">Log In</Button>
            <Button variant="outline-dark" className="mr-3 my-1" href="/register">Register</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  return (
    <BrowserRouter>
      {valid.valid ? navLoggedIn() : navNotLoggedIn()}

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/search'>
          <Search />
        </Route>
        <Route path='/location/:locationID'>
          <CatResults />
        </Route>
        <Route path='/cat/:id'>
          <CatProfile />
        </Route>
        <Route path='/profile/:id'>
          {/* NEED TO ADD SLUG */}
          <UserProfile />
        </Route>
        <Route path='/login'>
          <Login setValid={setValid} />
        </Route>
        <Route path='/register'>
          <RegisterContainer setValid={setValid} />
        </Route>

        {/* THESE ROUTES SHOULD BE PRIVATE */}
        <PrivateRoute path='/dashboard' component={Dashboard} valid={valid}/>
        <PrivateRoute path='/logout' component={LogOut} valid={valid} setValid={setValid}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
