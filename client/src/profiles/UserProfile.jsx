import React, { useState, useEffect } from 'react'
import { Card, Col, Container, Image, Nav, Row, Table } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import Axios from 'axios'

/* REDIRECT IF USER NOT FOUND */

const UserProfile = () => {
  let { id } = useParams()
  const [user, setUser] = useState({
    user: null,
    found: false,
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        let resp = await Axios.get(`http://localhost:8080/user/${id}`);
        setUser({ user: resp.data.user, found: true });
        /* REDIRECT IF USER NOT FOUND */
      } catch (e) {
        // setError(e.response.data.message);
        console.log(e.response)
      }
    }
    fetchUser()
  }, [id])

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
              <NavLink to='/'><span className="btn btn-dark btn-block">Edit Profile</span></NavLink>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="p-4">
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
                    <tr>
                      <td><strong>Other tracked locations: </strong></td>
                      <td> This can be at the bottom  </td>
                    </tr>
                    <tr>
                      <td><strong>Fave cats: </strong></td>
                      <td> This can be at the bottom </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      }
        <Container className="d-flex flex-row border border-dark mt-4">
          <Row className="p-3">
            <Col>
                <Table>
                  <tbody>
                    <tr>
                      <td><strong>Tracked locations: </strong></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td><strong>Fave Cats: </strong></td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
            </Col>
          </Row>
        </Container>

    </>
  )
}

export default UserProfile
