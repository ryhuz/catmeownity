import Axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';

const Register = ({ setValid }) => {

  const [form, setForm] = useState({});
  const [home, setHome] = useState(false);

  function changeHandler(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function register() {
    try {
      //register user
      let resp = await Axios.post("http://localhost:8080/user/register", form); 
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
      <h1>Register page</h1>
      <Card className="p-3 mx-auto mt-5">
        <Card.Body>
          <Form>
            <Form.Label>
              Enter your details!
          </Form.Label>
            <Form.Group controlId="formBasicUsername">
              <Form.Control type="text" name="name" placeholder="Name" onChange={changeHandler} />
            </Form.Group>
            <Form.Group controlId="formBasicUsername">
              <Form.Control type="text" name="email" placeholder="Email" onChange={changeHandler} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" name="password" placeholder="Password" onChange={changeHandler} />
            </Form.Group>
            {/* <Form.Group controlId="formBasicFirst">
              <Form.Control type="text" name="location" placeholder="Location" onChange={changeHandler} />
            </Form.Group> */}
            <Button variant="dark" name="password" block onClick={register}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Register;
