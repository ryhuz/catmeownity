import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Container, Form, InputGroup, Image, Jumbotron, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Axios from 'axios'

/* REDIRECT IF USER NOT FOUND */

function UserProfile() {

  let token = localStorage.getItem('token');
  let { id } = useParams();
  Axios.defaults.headers.common['x-auth-token'] = token;

  //Pulls user data
  const [user, setUser] = useState({
    user: null,
    found: false,
  });

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
  const [form, setForm] = useState({
    name: user.found.name,
    email: user.found.email,
  });
  const [addName, setAddName] = useState("")

  function changeHandler(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "name") {
        setAddName(e.target.value)
    }
  }

async function editProfile() {
  try {
    if (user.user.name.length > 1) {
      user.user.name.shift();
      user.user.name.unshift(addName);
      await Axios.put(`http://localhost:8080/auth/user/${id}`, {
        name: user.user.name,
        email: user.user.email,
      });
    } else {
      await Axios.put(`http://localhost:8080/auth/user/${id}`, form);
    }
      setShowEditProfile(false)
      window.location.reload()
  } catch (e) {
      console.log(e.response)
  }
}

const [uploadingPhoto, setUploadingPhoto] = useState(false);
async function uploadPicture() {
  try {
    let tempPhoto;
    
  } catch (error) {
    
  }

}


  return (
    <>
    {/* My Profile Jumbotron */}
    <Jumbotron className="bg-dark">
      <Container>
        <h3 className="mt-4 text-white">My Profile</h3>
      </Container>
    </Jumbotron>

    {/* Start of Profile */}
      {user.found &&
        <Container className="d-flex flex-row border">
          <Row className="p-3">
            <Col>
              <div>
                <Image className="mx-auto p-4" width="100%" src={user.user.image} roundedCircle />
              </div>
              <Button className="btn btn-dark btn-block" onClick={() => setShowEditProfile(true)}>Edit Profile</Button>
              {/* <Button className="btn btn-dark btn-block" onClick={() => setShowEditPicture(true)}>Edit Profile Picture</Button> */}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="m-4">
              <div>
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
                      {console.log(user)}
                      <td><strong>Home Location: </strong></td>
                      <td> {/* {user.user.homeLocation.street} */}  </td>
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
          <Row>
            <Col>

            </Col>
          </Row>
              {/* Check if edit button is pressed then show edit form and update button */}
                {showEditProfile ? <div>
                  <small>Name:</small>
                  <InputGroup>
                    <Form.Control type="text" placeholder="Enter name" defaultValue={user.user.name} onChange={changeHandler} name="names" aria-describedby="basic-addon2" />
                      {/* <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={addButton}>Add</Button>
                      </InputGroup.Append> */}
                  </InputGroup>
                  <div>
                    <small>Email:</small>
                    <div className="h5">
                      <Form.Control type="text" placeholder="Enter email" onChange={changeHandler} defaultValue={user.user.email} name="email" />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Button variant="dark" onClick={() => setShowEditProfile(false)}>Cancel</Button>
                    <Button variant="dark" onClick={() => setShowEditProfile(true)}>Edit</Button>
                    <Button variant="dark" onClick={editProfile}>Update</Button>
                  </div>
                  </div> : <div>
                </div>}
              </div>
            </Col>
          </Row>
        </Container>
      }
    {/* End of Profile */}

    {/* Start of Container with locations and favorite cats */}
      <Container className="d-flex border border-dark mt-4 mb-4">
        <Row className="p-3">
          <Col>
            <Table borderless>
              <tbody>
                <tr>
                  <td><strong>Tracked locations: </strong></td>
                  <td>One cat just leads to another...</td>
                </tr>
                  {/* <Button className="btn" size="sm" variant="outline-success">Track here!</Button> */}
                <tr>
                  <td><strong>Favorite Cats: </strong></td>
                  <td>Hmm... Looks like you haven't favorited any cats yet.</td>
                </tr>
                  {/* <div className="btn" size="sm" variant="outline-danger">Add now!</div> */}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    {/* End of Container */}

    {/* Start of Footer */}
      <Card className="bg-dark text-white p-3 mx-auto">
        <Card.Body>
        <Form className="text-center">
          <Form.Label>
            <Card.Title className="text-center h-5">Kitty stuff</Card.Title>
          </Form.Label>
        </Form>
      </Card.Body>
      </Card>
    {/* End of Footer */}
    </>
  )
}

export default UserProfile

//onChange={changeHandler}
//onClick={addButton}
//onChange={changeHandler}
//defaultValue={user.user.name}
//defaultValue={user.user.email}