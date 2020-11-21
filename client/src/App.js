import React, { useState, useEffect } from 'react'
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Switch from 'react-bootstrap/esm/Switch';
import { BrowserRouter, NavLink, Route } from 'react-router-dom'
import CatProfile from './profiles/CatProfile';
import Home from './landings/Home'
import AreaResult from './landings/Search/AreaResult';
import CatResults from './landings/Search/CatResults';
import Search from './landings/Search/Search';
import Login from './landings/account/Login';
import RegisterContainer from './landings/account/RegisterContainer';

function App() { 

  const [valid, setValid] = useState(false);

  useEffect(() => {
    checkLoggedIn()
  }, [valid])

  function checkLoggedIn() {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setValid(false);
  }

  /* show this navbar when logged in */
  function navLoggedIn() {
    return (
      <Navbar bg="light" expand="lg">
        <NavLink className="navbar-brand" to="/">CatMeownity</NavLink>
        <button className="badge badge-pill badge-secondary" onClick={logout}>Logout</button>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
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
      {checkLoggedIn() ? navLoggedIn() : navNotLoggedIn()}

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/search'>
          <Search />
        </Route>
        <Route path='/search/:area'>
          <AreaResult />
        </Route>
        <Route path='/location/:locationID'>
          <CatResults />
        </Route>
        <Route path='/cat'>
          {/* NEED TO ADD SLUG */}
          <CatProfile />
        </Route>
        <Route path='/login'>
          <Login setValid={setValid}/>
        </Route>
        <Route path='/register'>
          <RegisterContainer setValid={setValid}/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
