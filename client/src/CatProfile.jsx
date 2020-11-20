import React from 'react'
import { Container, Row, Col, Badge, Table } from 'react-bootstrap'

function CatProfile() {
    return (
        <Container className="border border-dark">
            <h4 className="text-center">Cat Name</h4>
            <Row>
                <Col md={6}>

                    <div>
                        <img src="http://placekitten.com/200/300" className="rounded  " />
                    </div>
                    <div>
                        <Badge className="badge badge-pill badge-danger">Missing</Badge>
                    </div>
                    <div className="my-2">
                        <h5>Last fed by: </h5>
                    </div>
                    <div className="my-2">
                        <h5>Last 3 eating times</h5>
                        <ul>
                            <li>First time</li>
                            <li>Second time</li>
                            <li>Third time</li>
                        </ul>
                    </div>
                </Col>
                <Col md={6}>
                    <Table borderless size="sm">
                        <tbody>
                            <tr>
                                <td>Other names:</td>
                                <td>Mark</td>
                            </tr>
                            <tr>
                                <td>Breeds:</td>
                                <td>Persian</td>
                            </tr>
                            <tr>
                                <td>Color:</td>
                                <td>Brown</td>
                            </tr>
                            <tr>
                                <td>Description:</td>
                                <td>Furry</td>
                            </tr>
                            <tr>
                                <td>Location:</td>
                                <td>At the carpark</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default CatProfile
