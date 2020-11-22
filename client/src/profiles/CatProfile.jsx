import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Badge, Table, Accordion, Card, Button } from 'react-bootstrap'
import Axios from 'axios'
import { useParams } from 'react-router-dom';


function CatProfile() {
    let { id } = useParams()
    const [cat, setCat] = useState({
        cat: null,
        found: false,
    });

    useEffect(() => {
        async function fetchCat() {
            try {
                let resp = await Axios.get(`http://localhost:8080/public/cat/${id}`);
                setCat({ cat: resp.data.cat, found: true });
                /* REDIRECT IF USER NOT FOUND */
            } catch (e) {
                // setError(e.response.data.message);
                console.log(e.response)
            }
        }
        fetchCat()
    }, [id])

    function displayOtherNames() {
        let other = cat.cat.names.slice(1);
        return (
            <>
                {other.map((name, index) => (
                    <span key={index} className="font-italic">{name}</span>
                ))}
            </>
        )
    }
    function displayEatingTimes() {
        let times = cat.cat.fed;
        if (times.length > 0) {
            return (
                <>
                    {times.map((time, index) => (
                        <li key={index} >{time}</li>
                    ))}
                </>
            )
        } else {
            return (
                <>
                    <span>Not Sure</span>
                </>
            )
        }

    }
    function displayLocations() {
        let places = cat.cat.locations;
        if (places.length > 0) {
            return (
                <>
                    {places.map((place, index) => (
                        <li key={index} >{place.street}</li>
                    ))}
                </>
            )
        } else {
            return (
                <>
                    <span>Not Sure</span>
                </>
            )
        }
    }
    console.log(cat)
    return (
        <>{cat.found &&
            <Container className="border border-dark">
                <h4 className="text-center my-2">{cat.cat.names[0]}</h4>
                <Row>
                    <Col md={5}>

                        <div>
                            <img src="http://placekitten.com/200/300" className="rounded thumbnail img-responsive mx-auto d-block " width="250px" />
                        </div>
                        <div className="text-center my-2">
                            <Badge className="badge badge-pill badge-danger mx-5">Missing</Badge>
                            <i class="far fa-heart mx-5"></i>
                        </div>
                    </Col>
                    <Col md={7} className="border">
                        <Table borderless size="lg">
                            <tbody>
                                {cat.cat.names.length > 1 &&
                                    <tr>
                                        <td width="25%">Other names:</td>
                                        <td>{displayOtherNames()}</td>
                                    </tr>
                                }
                                <tr>
                                    <td>Gender:</td>
                                    <td>{cat.cat.gender}</td>
                                </tr>
                                <tr>
                                    <td>Last fed:</td>
                                    <td className="align-middle">{displayEatingTimes()}</td>
                                </tr>
                                <tr>
                                    <td>Breed:</td>
                                    <td>{cat.cat.breed}</td>
                                </tr>
                                <tr>
                                    <td>Color:</td>
                                    <td>{cat.cat.colour}</td>
                                </tr>
                                <tr>
                                    <td>Description:</td>
                                    <td>{cat.cat.desc}</td>
                                </tr>
                                <tr>
                                    <td>Residing:</td>
                                    <td>{displayLocations()}</td>
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
        }
        </>
    )
}

export default CatProfile
