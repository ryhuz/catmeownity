import React from 'react'
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Switch from 'react-bootstrap/esm/Switch';
import { BrowserRouter, NavLink, Route } from 'react-router-dom'
import Home from './landings/Home'
import AreaResult from './landings/Search/AreaResult';
import Search from './landings/Search/Search';

function App() {

  function checkLoggedIn() {
    return false;
  }

  /* show this navbar when logged in */
  function navLoggedIn() {
    return (
      <Navbar bg="light" expand="lg">
        <NavLink className="navbar-brand" to="/">CatMeownity</NavLink>
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
            <Button variant="outline-dark" className="mr-3 my-1">Log In</Button>
            <Button variant="outline-dark" className="mr-3 my-1">Register</Button>
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
        <Route path='/login'>
          {/* LOGIN PAGE HERE */}
        </Route>
        <Route path='/register'>
          {/* REGISTER PAGE HERE */}
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
