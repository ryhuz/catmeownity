import React, { useState } from 'react'
import { Button, Card, Col, Form, Image, Row } from 'react-bootstrap'
import Axios from 'axios'
import load from '../../loading.gif'

function Register({ changeHandler, nextSection, form }) {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState({
    email: "",
    name: false,
    password: false,
  });
  function handleEnter(e) {
    if (e.key === 'Enter') {
      nextSection(true)
    }
  }
  async function blur() {
    setLoading(true);
    if (form.email !== "") {
      try {
        let exists = await Axios.get(`http://localhost:8080/user/check/${form.email}`);
        if (exists.data.found) {
          setErrMsg({ ...errMsg, email: "This email is already registered" })
        } else {
          setErrMsg({ ...errMsg, email: "" })
        }
      } catch (e) {

      }
    } else {
      setErrMsg({ ...errMsg, email: "" })
    }
    setLoading(false);
  }

  function next() {
    let hasEmail = !(form.email === "");
    let hasName = !(form.name === "");
    let hasPassword = !(form.password === "");
    if (!hasEmail || !hasName || !hasPassword || errMsg.email.length > 0) {
      setErrMsg({
        email: !hasEmail ? "Please enter your email" : errMsg.email,
        name: !hasName,
        password: !hasPassword
      })
      console.log(errMsg)
    } else {
      nextSection(true)
    }
  }

  return (
    <Card className="p-3 mx-auto mt-5">
      <Card.Body>
        <Form>
          <Form.Label>
            <h5>You're on your way to a wonderful world of cats!</h5>
          </Form.Label>
          <hr />
          <Row className="justify-content-center">
            <Col sm={8}>
              <Form.Group controlId="formBasicEmail">
                {loading && <div className="text-center"><Image src={load} width="10%" /></div>}
                <Form.Control type="text" name="email" placeholder="Email (you will use this to log in)" value={form.email && form.email}
                  onChange={changeHandler} onKeyDown={handleEnter} onBlur={blur} />
                {errMsg.email !== "" &&
                  <Form.Text>
                    <div className="text-danger">{errMsg.email}</div>
                  </Form.Text>
                }
              </Form.Group>
              <Form.Group controlId="formBasicName">
                <Form.Control type="text" name="name" placeholder="Name" value={form.name && form.name}
                  onChange={changeHandler} onKeyDown={handleEnter} />
                {errMsg.name &&
                  <Form.Text>
                    <div className="text-danger">Please enter your name</div>
                  </Form.Text>
                }
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" name="password" placeholder="Password" value={form.password && form.password}
                  onChange={changeHandler} onKeyDown={handleEnter} />
                {errMsg.password &&
                  <Form.Text>
                    <div className="text-danger">Please enter your password</div>
                  </Form.Text>
                }
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <Row className="justify-content-center">
          <Col sm={8}>
            <Button variant="dark" block onClick={next} disabled={loading}>
              Next Step
            </Button>
            <Row className='justify-content-end mt-3'>
              <Col />
              <Col sm='auto'>
                Have an account?
              </Col>
            </Row>
            <Row bottom="xs">
              <Col />
              <Col sm='auto'>
                <a href="/login">Log in here</a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default Register
