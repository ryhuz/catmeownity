import React, { useState, useEffect } from 'react'
import { Button, Card, CardGroup, Col, Form, Image, Modal, Row } from 'react-bootstrap';
import { decode } from "jsonwebtoken";
import Axios from 'axios'
import { NavLink } from 'react-router-dom';
import ConfirmUnfollow from './ConfirmUnfollow';

const Dashboard = () => {
  let token = localStorage.getItem('token')
  let user = decode(token);

  const [confirmUnfollow, setConfirmUnfollow] = useState(false);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    async function fetchProfile() {
      try {
        let resp = await Axios.get(`http://localhost:8080/auth/user/${user.user._id}`, {
          headers: {
            "x-auth-token": token,
          },
        });
        setProfile(resp.data.user);
      } catch (e) {
        // setError(e.response.data.message);
        console.log(e.response)
      }
    }
    fetchProfile()
  }, [])

  function showFavouriteCats() {
    if (profile.favorites.length > 0) {
      return (
        <>
          {profile.favorites.map(cat => (
            <Col key={cat._id}>
              <Card>
                {/* IF HAVE IMAGE, DISPLAY IMAGE, ELSE PLACEHOLDER */}
                <Image src="http://placehold.it/200x200" width="100%" className="img-thumbnail" />
                <Card.Header className='h5'>
                  <NavLink to={`/cat/${cat._id}`}>{cat.names[0]}</NavLink>
                </Card.Header>
                <Card.Body>
                  <div>{cat.locations[0].street}</div>
                  <div>
                    <Button variant="outline-danger" block onClick={() => setConfirmUnfollow(true)}>
                      <i className="fas fa-cat mx-2"></i>Unfollow this cat
                    </Button>
                    <Modal show={confirmUnfollow} onHide={() => (setConfirmUnfollow(false))}>
                      <ConfirmUnfollow setConfirmUnfollow={setConfirmUnfollow} name={cat.names[0]} gender={cat.gender} unfollow={() => unfollow(cat._id)} />
                    </Modal>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </>
      )
    }
  }

  async function unfollow(id) {
    await Axios.put(`http://localhost:8080/auth/user/${user.user._id}/unfavourite/${id}`, {
      headers: {
        "x-auth-token": token,
      },
    });
    
    setConfirmUnfollow(false);
    let temp = profile.favorites;
    temp.splice(temp.indexOf(x => x._id === id), 1);
    setProfile({ ...profile, favourites: temp });
  }

  return (
    <div>
      <Card bg="dark text-white" className="text-center mr-4">
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

      <CardGroup className="mx-5">
        <Card className="mb-3 mx-5">
          <Card.Body>
            <Card.Title>Your favourite cats</Card.Title>
            <Row sm={2} md={3}>
              {profile.favorites && showFavouriteCats()}
            </Row>
            <Button variant="dark" block>Go somewhere</Button>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        {/* ---------- middle ------------ */}
        <Card className="text-center mb-3 mx-5">
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

