import React from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
// import { Link } from 'react-router-dom';


const Login = () => {
return (
    <Container>
        <h1>login page</h1>
    <Card className="p-3 mx-auto mt-5">
      <Image className="mx-auto" width="20%" src="https://unsplash.it/200/200" roundedCircle />
      <Card.Body>
        <Form>
          <Form.Group controlId="formBasicUsername">
              <Form.Control type="text" name="email" placeholder="Email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" name="password" placeholder="Password" />
          </Form.Group>
              <Button variant="primary" name="password" block>
              Login
              </Button>
        <Row>
          <Col className="mt-4" xs={12}>
            <Row end="xs">
              <Col xs={10} />
              Don't have an account? 
            </Row>
          </Col>
      </Row>
      <Row bottom="xs">
        <Col xs={10} />
          <a href="/">Sign up here</a>
        <Col xs={6} />
      </Row>
        </Form>
      </Card.Body>
    </Card>
    </Container>
  )
}

export default Login
