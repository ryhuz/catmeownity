import React from 'react';
import { Container, Row, Col, Image, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const UserProfile = () => {
  return (
    <>
    <Container className="d-flex flex-row border border-dark mt-4">
      <Row className="p-3">
        <Col>
          <div>
            <Image className="mx-auto" width="100%" src="http://placekitten.com/300/300" roundedCircle />
          </div>
          <div className="text-center my-2">
          <span>Name</span>
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
                    <td>Name: </td>
                    {/* <td> user.name here </td> */}
                </tr>
                <tr>
                    <td>Email: </td>
                    {/* <td> user.email here </td> */}
                </tr>
                <tr>
                    <td>Location: </td>
                    {/* <td> user.location here </td> */}
                </tr>
                {/* not sure if tracked and favorite to be place here */}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
        {/* <Container className="d-flex flex-row border border-dark mt-4">
          <Row>
            <Col>
              dfdsf
            </Col>
          </Row>
        </Container> */}
    </>
  )
}

export default UserProfile
