import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Container, Form, Image, Jumbotron, Row, Table, Modal } from 'react-bootstrap';
import pic from '../../resources/no-profile-pic.png'
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { decode } from "jsonwebtoken";
import UserPhotoUpload from './UserPhotoUpload';

/* REDIRECT IF USER NOT FOUND */

function UserProfile() {
  let token = localStorage.getItem('token');
  let { id } = useParams();
  let loggedUser = decode(token)
  Axios.defaults.headers.common['x-auth-token'] = token;
  const node = useRef()

  //Pulls user data
  const [user, setUser] = useState({
    user: null,
    found: false,
  });
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [form, setForm] = useState({});
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [ownProfile, setOwnProfile] = useState(false);

  //fetch user
  useEffect(() => {
    fetchUser()
  }, [id])

  //check if click outside everytime own profile changes
  useEffect(() => {
    // add when mounted
    ownProfile && document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ownProfile]);

  //Check if own profile everytime user changes
  useEffect(() => {
    if (user.found && token) {
      if (user.user._id === loggedUser.user._id) {
        setOwnProfile(true)
        setForm({
          name: user.user.name,
          email: user.user.email,
        })
      } else {
        setOwnProfile(false)
      }
    }
  }, [user])

  async function fetchUser() {
    try {
      let resp = await Axios.get(`http://localhost:8080/user/${id}`);
      setUser({ user: resp.data.user, found: true })
    } catch (err) {
      console.log(err.response)
    }
  }

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click 
    setShowEditProfile(false)
  };

  function changeHandler(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function editProfile() {
    try {
      await Axios.put(`http://localhost:8080/auth/user/${id}`, form);
      setShowEditProfile(false)
      fetchUser()

    } catch (err) {
      console.log(err.response)
    }
  }

  function reFetchUser() {
    fetchUser();
  }

  return (
    <>
      {/* My Profile Jumbotron */}
      <Jumbotron className="bg-dark jumbotop">
        <Container>
          <h3 className="mt-4 text-white">My Profile</h3>
        </Container>
      </Jumbotron>

      {/* Start of Profile */}
      {user.found && <Col>
        <Modal show={uploadingPhoto} onHide={() => (setUploadingPhoto(false))} size="lg">
          <UserPhotoUpload setUploadingPhoto={setUploadingPhoto} addPhoto={reFetchUser} id={id} addOrChange={user.user.image ? "change" : "add"} />
        </Modal>
        {!showEditProfile ?
          <Container className="d-flex flex-row border">
            <Row className="p-3">
              <Col>
                <div>
                  <Image className="mx-auto p-4" src={user.user.image ? user.user.image : pic} roundedCircle />
                </div>
                {ownProfile && <Col xs={11} className="mx-auto"><Button block variant="outline-dark" className="my-1" ref={node} onClick={() => setUploadingPhoto(true)}>Change Profile Pic</Button></Col>}
                {ownProfile && <Col xs={11} className="mx-auto"><Button block variant="dark" className="my-1" ref={node} onClick={() => setShowEditProfile(true)}>Edit Profile</Button></Col>}
                {!user.user.image && ownProfile &&
                  <div>
                    <Col className='text-center py-2'>
                      You don't have a picture yet.
                    </Col>
                    <Col className='text-center'>
                      <div className='btn btn-success' onClick={() => setUploadingPhoto(true)}>
                        Add their first photo!
                      </div>
                    </Col>
                  </div>}
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
                    </tbody>
                  </Table> </div>
              </Col>
            </Row>
          </Container> : <div>
            <Container className="d-flex flex-row border">
              <Row className="p-3">
                <Col>
                  <div>
                    <Image className="mx-auto p-4" src={user.user.image ? user.user.image : pic} roundedCircle />
                  </div>
                </Col>
              </Row>
              <Row className="mt-4" ref={node}>
                <Col className="m-4">
                  <small>Name:</small>
                  <Form.Control type="text" placeholder="Enter name" defaultValue={user.user.name} onChange={changeHandler} name="name" aria-describedby="basic-addon2" />
                  <div>
                    <small>Email:</small>
                    <div className="h5">
                      <Form.Control type="text" placeholder="Enter email" onChange={changeHandler} defaultValue={user.user.email} name="email" />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Button variant="dark" onClick={editProfile}>Update</Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div >}
      </Col>}

      {/* End of Profile */}

      {/* Start of Container with locations and favorite cats */}
      <Container className="d-flex border border-dark mt-4 mb-4">
        <Row className="p-3">
          <Col>
            <div className="borderless">
              <Col>
                <div>
                  <h6><strong>Tracked locations: </strong></h6>
                  <small>One cat just leads to another...</small>
                </div>
                <br />
                <br />
                <div>
                  <h6><strong>Favorite Cats: </strong></h6>
                  <small>Hmm... Looks like you haven't favorited any cats yet.</small>
                </div>
              </Col>
            </div>
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