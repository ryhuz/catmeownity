import React from 'react'
import { Button, Card, CardGroup, Col, Form, Row } from 'react-bootstrap';



const Dashboard = ({ user }) => {

return (
  <div>
      <Card bg="dark text-white" className="text-center">
        <Card.Header>Profile</Card.Header>
        <Card.Body className="m-4">
          <Card.Title>Welcome Back!</Card.Title>
          <Card.Text className="p-4">
            With supporting text below as a natural lead-in to additional content.
            <br />
            “Every cat is my best friend.” – Unknown
          </Card.Text>
          <Button variant="outline-warning">Go somewhere</Button>
        </Card.Body>
      </Card>
  <Row>
  <Col xs />
  <CardGroup className="w-75 m-4">
    <Card className="text-center mb-3">
      <Card.Img src="http://placekitten.com/1200/600" />
      <Card.Body>
        <Card.Title>Cats</Card.Title>
        <ul>
          <li>Address</li>
          <li>Cat List</li>
        </ul>
        <Button variant="dark" block>Go somewhere</Button>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
  {/* middle */}
  <Col/> 
  {/* middle */}
  <Card className="text-center mb-3">
  <Card.Img src="https://picsum.photos/1200/600" />
    <Card.Body>
      <Card.Title>Your tracked locations</Card.Title>
      <ul>
        <li>Locations list</li>
        <li>Open up to cats in each location</li>
      </ul>
      <Button variant="dark" block>Go somewhere</Button>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
</CardGroup>
  <Col  />
</Row>
  <Card className="bg-dark text-white p-3 mx-auto">
    <Card.Body>
      <Form className="text-center">
        <Form.Label>
        <Card.Title className="text-center h-5">Kitty stuff</Card.Title>
        </Form.Label>
      </Form>
    </Card.Body>
  </Card>
  </div>
)
}

export default Dashboard

