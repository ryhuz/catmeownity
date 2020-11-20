import React from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'

const Register = () => {
  return (
  <Container>
    <h1>Register page</h1>
      <Card className="p-3 mx-auto mt-5">
        <Card.Body>
        <Form>
          <Form.Label>
            Enter your details!
          </Form.Label>
          <Form.Group controlId="formBasicUsername">
              <Form.Control type="text" name="name" placeholder="Name" />
          </Form.Group>
          <Form.Group controlId="formBasicUsername">
              <Form.Control type="text" name="email" placeholder="Email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" name="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicFirst">
              <Form.Control type="text" name="location" placeholder="Location" />
          </Form.Group>
            <Button variant="primary" name="password" block>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
  </Container>
  )
}

export default Register;
