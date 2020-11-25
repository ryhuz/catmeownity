import React, { useState, useEffect } from 'react'
import { Button, Card, CardGroup, Col, Container, Form, Image, Jumbotron, Modal, Row } from 'react-bootstrap';
import { decode } from "jsonwebtoken";
import Axios from 'axios'
import { NavLink } from 'react-router-dom';
import ConfirmUnfollow from './ConfirmUnfollow';
import pic from '../../resources/nocatpic.png'
import ConfirmUntrack from './ConfirmUntrack';

const Dashboard = () => {
  let token = localStorage.getItem('token')
  let user = decode(token);
  Axios.defaults.headers.common['x-auth-token'] = token;

  const [confirmUnfollow, setConfirmUnfollow] = useState(false);
  const [confirmUntrack, setConfirmUntrack] = useState(false);
  const [unParams, setUnParams] = useState({
    name: "",
    gender: "",
    ID: "",
  });

  const [profile, setProfile] = useState({
    profile: {},
    found: false
  });
  /* getting user data */
  useEffect(() => {
    async function fetchProfile() {
      try {
        let resp = await Axios.get(`http://localhost:8080/auth/user/${user.user._id}`);
        setProfile({
          profile: resp.data.user,
          found: true
        });
      } catch (e) {
        console.log(e.response)
      }
    }
    fetchProfile()
  }, [])

  function toConfirmUnfollow(name, gender, ID) {
    setUnParams({
      name,
      gender,
      ID
    })
    setConfirmUnfollow(true)
  }
  function toConfirmUntrack(name, ID) {
    setUnParams({
      name,
      ID
    })
    setConfirmUntrack(true)
  }
  function showFavouriteCats() {
    if (profile.profile.favourites.length > 0) {
      return (
        <>
          {profile.profile.favourites.map(cat => (
            <Col key={cat._id}>
              <Card>
                <NavLink to={`/cat/${cat._id}`}>
                  <Image src={showCatPhoto(cat)} width="100%" className="img-thumbnail" />
                </NavLink>
                <Card.Header className='h5'>
                  <NavLink to={`/cat/${cat._id}`}>{cat.names[0]}</NavLink>
                </Card.Header>
                <Card.Body>
                  <div>{cat.location.street}</div>
                  <div>
                    <Button variant="outline-danger" block onClick={() => toConfirmUnfollow(cat.names[0], cat.gender, cat._id)}>
                      <i className="fas fa-cat mx-2"></i>Unfollow this cat
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </>
      )
    } else {
      return (
        <Col>
          <Card>
            <Card.Title>
              You haven't followed any cats :(
            </Card.Title>
            <Card.Body>
              Search for one now!
            </Card.Body>
          </Card>
        </Col>
      )
    }
  }
  function showTrackedLocations() {
    if (profile.profile.trackedLocations.length > 0) {
      let tracked = profile.profile.trackedLocations;
      let districts = [];
      tracked.forEach(location => {
        districts.push(location.district.name)
      });
      districts = Array.from(new Set(districts)).sort();
      let allTracked = tracked.sort(function (a, b) {
        var nameA = a.street;
        var nameB = b.street;
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      })
      return (
        <>
          {districts.map(district => (
            <div key={district}>
              <h6>{district}</h6>
              <hr />
              <Row className="mb-4">
                {allTracked.map(place => (
                  <div key={place._id}>
                    {place.district.name === district &&
                      <>
                        <Col>
                          <div className="d-flex">
                            <NavLink to={`/location/${place._id}`} className='btn btn-success btn-block'>
                              {place.street}
                            </NavLink>
                            <div className='btn btn-outline-danger d-flex align-items-center' onClick={() => toConfirmUntrack(place.street, place._id)}>
                              <span aria-hidden="true">&times;</span>
                            </div>
                          </div>
                        </Col>
                      </>
                    }
                  </div>
                ))}
              </Row>
            </div>
          ))
          }

        </>
      )
    } else {
      return (
        /*         <Col>
                  <Card>
                    <Card.Title>
                      You haven't followed any cats :(
                    </Card.Title>
                    <Card.Body>
                      Search for one now!
                    </Card.Body>
                  </Card>
                </Col> */
        <>
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
    let temp = profile.profile.favourites;
    temp.splice(temp.findIndex(x => x._id == id), 1);
    console.log('after', temp)

    setProfile({ ...profile, favourites: temp });
  }

  async function untrack(id) {
    await Axios.put(`http://localhost:8080/auth/user/${user.user._id}/untrack/${id}`, {
      headers: {
        "x-auth-token": token,
      },
    });

    setConfirmUntrack(false);

    let temp = profile.profile.trackedLocations;
    temp.splice(temp.findIndex(x => x._id === id), 1);
    console.log(temp)
    setProfile({ ...profile, trackedLocations: temp });
  }

  function showCatPhoto(cat) {
    if (cat.photos.length > 0) {
      let temp = cat.photos.find(x => x.isDefault)
      return temp.image;
    } else {
      return pic;
    }
  }
  return (
    <div>
      <Modal show={confirmUnfollow} onHide={() => (setConfirmUnfollow(false))}>
        <ConfirmUnfollow setConfirmUnfollow={setConfirmUnfollow} name={unParams.name} gender={unParams.gender} unfollow={() => unfollow(unParams.ID)} />
      </Modal>
      <Modal show={confirmUntrack} onHide={() => (setConfirmUntrack(false))}>
        <ConfirmUntrack setConfirmUntrack={setConfirmUntrack} location={unParams.name} untrack={() => untrack(unParams.ID)} />
      </Modal>
      {profile.found &&
        <>
          {/* Header */}
          <Jumbotron className='bg-dark jumbotop'>
            <Card.Title className="text-white mb-auto jumbotitledown">Welcome back, {profile.profile.name}!</Card.Title>
          </Jumbotron>
          {/* Profile Preview */}
          <Row className="mx-5 p-3 justify-content-center">
            <Col sm={3}>
              <Image src={profile.profile.image} width="100%" />
            </Col>
            <Col sm={3}>
              <NavLink to={`/profile/${profile.profile._id}`} className='btn'>
                View full profile
              </NavLink>
            </Col>
          </Row>
          <div className="bg-dark">
            {/* Favourite Cats */}
            <CardGroup className="mx-5 py-4">
              <Card className="mb-3 mx-5">
                <Card.Body>
                  <Card.Title>Your favourite cats</Card.Title>
                  <Row sm={1} md={1} lg={3}>
                    {showFavouriteCats()}
                  </Row>
                </Card.Body>
              </Card>
              {/* Tracked locations */}
              <Card className="mb-3 mx-5">
                <Card.Body>
                  <Card.Title>Your tracked locations</Card.Title>
                  <div>
                    {showTrackedLocations()}
                  </div>
                </Card.Body>
              </Card>
            </CardGroup>
          </div>
          <Card className="bg-dark text-white p-3 mx-auto">
            <Card.Body>
              <Form className="text-center">
                <Form.Label>
                  <Card.Title className="text-center h-5">Kitty stuff</Card.Title>
                </Form.Label>
              </Form>
            </Card.Body>
          </Card>
        </>
      }
    </div>
  )
}

export default Dashboard

