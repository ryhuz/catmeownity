import Axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const Login = ({ setValid }) => {

  const [form, setForm] = useState({});
  const [home, setHome] = useState(false);

  function changeHandler(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function login() {
    try {
      //register user
      let resp = await Axios.post("http://localhost:2000/user/login", form);
      //store token in local storage
      localStorage.setItem('token', resp.data.token);
      setValid(true);
      setHome(true);
    } catch (error) {
      console.log(error.response)
    }
  }

  if (home) return <Redirect to="/" />


  return (
    <Container>
      <h1>login page</h1>
      <Card className="p-3 mx-auto mt-5">
        <Image className="mx-auto" width="20%" src="https://unsplash.it/200/200" roundedCircle />
        <Card.Body>
          <Row className="justify-content-center">
            <Col sm={8}>
              <Form>
                <Form.Group controlId="formBasicUsername">
                  <Form.Control type="text" name="email" placeholder="Email" onChange={changeHandler} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control type="password" name="password" placeholder="Password" onChange={changeHandler} />
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
  )
}

export default Login;/* 
 */