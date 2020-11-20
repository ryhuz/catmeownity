import React from 'react'
import { Container, Row, Col, Badge, Table, Accordion, Card, Button } from 'react-bootstrap'





function CatProfile() {
    return (
        <>
            <Container className="border border-dark">
                <h4 className="text-center my-2">Cat Name</h4>
                <Row>
                    <Col md={6}>

                        <div>
                            <img src="http://placekitten.com/200/300" className="rounded thumbnail img-responsive mx-auto d-block " width="250px" />
                        </div>
                        <div className="text-center my-2">
                            <Badge className="badge badge-pill badge-danger mx-5">Missing</Badge>
                            <i class="far fa-heart mx-5"></i>
                        </div>
                    </Col>
                    <Col md={6} className="d-flex justify-content-center align-items-center">
                        <Table borderless size="lg">
                            <tbody>
                                <tr>
                                    <td>Last 3 eating times:</td>
                                    <td>Monday</td>
                                </tr>
                                <tr>
                                    <td>Last Fed:</td>
                                    <td>Mark</td>
                                </tr>
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
                    <Col md={12}>
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        More photos
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body className="mx-auto">
                                        <img src="http://placekitten.com/200/320" className="rounded thumbnail img-responsive mx-5" width="250px" />
                                        <img src="http://placekitten.com/200/310" className="rounded thumbnail img-responsive mx-5" width="250px" />
                                        <img src="http://placekitten.com/200/330" className="rounded thumbnail img-responsive mx-5" width="250px" />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CatProfile
