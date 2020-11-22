import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

function Register({ changeHandler, errMsg, nextSection }) {
  function handleEnter(e) {
    if (e.key === 'Enter') {
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
                <Form.Control type="text" name="email" placeholder="Email (you will use this to log in)" onChange={changeHandler} onKeyDown={handleEnter}/>
                {errMsg !== "" &&
                  <Form.Text>
                    <div className="text-danger">{errMsg}</div>
                  </Form.Text>
                }
              </Form.Group>
              <Form.Group controlId="formBasicName">
                <Form.Control type="text" name="name" placeholder="Name" onChange={changeHandler} onKeyDown={handleEnter}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" name="password" placeholder="Password" onChange={changeHandler} onKeyDown={handleEnter}/>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <Row className="justify-content-center">
          <Col sm={8}>
            <Button variant="dark" block onClick={()=>nextSection(true)}>
              Next Step
            </Button>
            <Row className='justify-content-end mt-3'>
              <Col />
              <Col sm='auto'>
                Have an account?
                    </Col>
            </Row>
            <Row bottom="xs">
              <Col/>
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
