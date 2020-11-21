import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

function Register({ setValid, changeHandler, errMsg }) {
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
              <Form.Group controlId="formBasicName">
                <Form.Control type="text" name="name" placeholder="Name" onChange={changeHandler} />
                {errMsg !== "" &&
                  <Form.Text>
                    <div className="text-danger">{errMsg}</div>
                  </Form.Text>
                }
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" name="email" placeholder="Email" onChange={changeHandler} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" name="password" placeholder="Password" onChange={changeHandler} />
              </Form.Group>
              {/* <Form.Group controlId="formBasicFirst">
              <Form.Control type="text" name="location" placeholder="Location" onChange={changeHandler} />
            </Form.Group> */}
            </Col>
          </Row>
        </Form>
        <Row className="justify-content-center">
          <Col sm={5}>
            <Button variant="dark" block>
              Next Step
              </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default Register
