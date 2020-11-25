import Axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Jumbotron, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const Login = ({ setValid }) => {

  

  const [form, setForm] = useState({});
  const [home, setHome] = useState(false);
  const [err, setErr] = useState({ msg: '' });
  
  let location = localStorage.getItem('location')
  

  function changeHandler(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleEnter(e) {
    if (e.key === 'Enter') {
      login();
    }
  }

  async function login() {
    try {
      //register user
      let resp = await Axios.post("http://localhost:8080/user/login", form);
      //store token in local storage
      localStorage.setItem('token', resp.data.token);
      setErr({})
      setValid({
        valid: true,
        refreshed: false,
      });
      setHome(true);
      localStorage.removeItem('location')
    } catch (error) {
      console.log(error.response)
      setErr(error.response.data)
    }
  }

  if (home && location) {
    return <Redirect to={`${location}`} />
  } else if (home) {
    return <Redirect to="/dashboard" />
  }
  console.log(location)
  return (
    <>
      <Jumbotron className='bg-warning'>
        <div className="ml-5 pl-5">
          <h1>Login</h1>
        </div>
      </Jumbotron>
      <Container>
        <Card className="p-3 mx-auto mt-5">
          <Card.Body>
            <Row className="justify-content-center">
              <Col sm={8}>
                <h3>Enter your user details</h3>
                <Form>
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label className="my-0 ml-1">
                      {err.msg && <small className="text-danger">{err.msg}</small>}
                    </Form.Label>
                    <Form.Control type="text" name="email" placeholder="Email" onChange={changeHandler} onKeyDown={handleEnter} />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" name="password" placeholder="Password" onChange={changeHandler} onKeyDown={handleEnter} />
                  </Form.Group>
                  <Button variant="dark" name="password" block onClick={login}>
                    Login
              </Button>
                  <Row className='justify-content-end mt-3'>
                    <Col />
                    <Col sm='auto'>
                      Don't have an account?
                    </Col>
                  </Row>
                  <Row bottom="xs">
                    <Col />
                    <Col sm='auto'>
                      <a href="/register">Sign up here</a>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default Login;/* 
 */