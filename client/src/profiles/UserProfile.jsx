import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Container, Form, InputGroup, Image, Modal, Nav, Row, Table } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import Axios from 'axios'

/* REDIRECT IF USER NOT FOUND */

const UserProfile = () => {
  let { id } = useParams()
  const [user, setUser] = useState({
    user: null,
    found: false,
  });

  const [addName, setAddName] = useState("")

  useEffect(() => {
    async function fetchUser() {
      try {
        let resp = await Axios.get(`http://localhost:8080/user/${id}`);
        setUser({ user: resp.data.user, found: true });
        // console.log(resp.data.user)
      } catch (err) {
        // setError(e.response.data.message);
        console.log(err.response)
      }
    }
    fetchUser()
  }, [id])

  const [showEditProfile, setShowEditProfile] = useState(false);
  // const [form, setForm] = useState
  // ({
  //   name: user.user.name,
  //   email: user.user.email,
  // });
  // console.log("hello: ", user.user)
  
  // function changeHandler(e) {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  //   if (e.target.name === "name") {
  //     setAddName(e.target.value)
  //   }
  // }
  async function editProfile() {
    try {
        await Axios.put(`http://localhost:8080/auth/user/${id}`); //form
        setShowEditProfile(false)
        window.location.reload()
    } catch (err) {
        console.log(err.response)
    }
}

  // async function addButton() {
  //     setForm({
  //         name: user.user.name.push(addName)
  //     })
  //     try {
  //         await Axios.put(`http://localhost:8080/auth/user/${id}`, form);
  //     } catch (err) {
  //         console.log(err.response)
  //     }
  // }

  return (
    <>
      {user.found &&
        <Container className="d-flex flex-row border border-dark mt-4">
          <Row className="p-3">
            <Col>
              <div>
                <Image className="mx-auto p-4" width="100%" src="http://placekitten.com/300/300" roundedCircle />
              </div>
              {/* Set link to edit profile page here */}
              {/* <NavLink to='/'><span className="btn btn-dark btn-block">Edit Profile</span></NavLink> */}
              <Button className="btn btn-dark btn-block" onClick={() => setShowEditProfile(true)}>Edit Profile</Button>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="m-4">
              <div>
              <div className="m-2 p-1">
                <h3>My Profile</h3>
              </div>
                <Table borderless size="lg">
                  <tbody>
                    <tr>
                      <td><strong>Name: </strong></td>
                      <td> {user.user.name} </td>
                    </tr>
                    <tr>
                      <td><strong>Email: </strong></td>
                      <td> {user.user.email}  </td>
                    </tr>
                    <tr>
                      <td><strong>Home Location: </strong></td>
                      <td> {user.user.location.street}  </td>
                    </tr>
                    {/* <tr>
                      <td><strong>Other tracked locations: </strong></td>
                      <td> This can be at the bottom  </td>
                    </tr>
                    <tr>
                      <td><strong>Fave cats: </strong></td>
                      <td> This can be at the bottom </td>
                    </tr> */}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      }
      <Container className="d-flex border border-dark mt-4 mb-4">
        <Row className="p-3">
          <Col>
            <Table borderless>
              <tbody>
                <tr>
                  <td><strong>Tracked locations: </strong></td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><strong>Favorite Cats: </strong></td>
                  <td>Hmm... Looks like you haven't favorited any cats yet.</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      {/* <Container className="d-flex flex-row border border-dark mt-4">
        <Row className="p-3">
          <Col>
          </Col>
        </Row>
      </Container> */}
        <Card className="bg-dark text-white p-3 mx-auto">
          <Card.Body>
          <Form className="text-center">
            <Form.Label>
              <Card.Title className="text-center h-5">Kitty stuff</Card.Title>
            </Form.Label>
          </Form>
        </Card.Body>
        </Card>
      <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showEditProfile}
          onHide={() => setShowEditProfile(false)}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Profile
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <InputGroup>
                      <Form.Control type="text" placeholder="Enter name" /* user.user.name here */ name="name" aria-describedby="basic-addon2" />
                      <InputGroup.Append>
                          <Button variant="outline-secondary" >Add</Button>
                      </InputGroup.Append>
                  </InputGroup>
              </Form.Group>
                  <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="text" placeholder="Enter email" /* user.user.email here */  name="email" />
                  </Form.Group>
              </Form>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
              <Button className="btn btn-dark btn-block" onClick={editProfile}>Update</Button>
          </Modal.Footer>
      </Modal>
    </>
  )
}

export default UserProfile

//onChange={changeHandler}
//onClick={addButton}
//onChange={changeHandler}
//defaultValue={user.user.name}
//defaultValue={user.user.email}