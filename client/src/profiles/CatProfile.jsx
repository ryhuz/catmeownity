import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Badge, Table, Accordion, Card, Button, Jumbotron, Carousel } from 'react-bootstrap'
import Axios from 'axios'
import { useParams } from 'react-router-dom';
import CatBio from './CatBio';


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
    function followed() {
        /* check user token, fetch followed, and check if this cat is in the array */
        return false;
    }
    function missing() {
        let miss = true;
        if (miss) {
            return (
                <Container className="bg-danger">
                    <Row>
                        <Col sm={5}>
                            <h5 className="mt-4 text-right">Missing Cat
                            </h5>
                        </Col>
                        <Col>
                            <h6 className="p-3">This cat hasn't been seen in a while.<br />Please contact us if you know of its whereabouts
                            </h6>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
    return (
        <>{cat.found &&
            <>
                <Jumbotron>
                    <Container>
                        <Row>
                            {/* Cat main picture and follow button */}
                            <Col>
                                <img src="http://placekitten.com/200/300" className="rounded thumbnail img-responsive mx-auto d-block " width="250px" />
                                <div className="text-center h4 mt-3">
                                    {followed() ?
                                        <>
                                            <Button variant="outline-danger">
                                                <i class="fas fa-heart mx-2"></i> Following this cat
                                            </Button>
                                        </> :
                                        <>
                                            <Button variant="secondary">
                                                <i class="fas fa-cat mx-2"></i> Follow this cat
                                            </Button>
                                        </>
                                    }
                                </div>
                            </Col>
                            {/* Cat profile */}
                            <CatBio cat={cat}/>
                        </Row>
                    </Container>
                    {missing()}
                    {/* Description Carousel */}
                    <Container className='mt-4'>
                        <Carousel>
                            <Carousel.Item>
                                <Card className="text-light bg-dark mx-5 px-5">
                                    <Container>
                                        <Card.Body>
                                            <blockquote class="blockquote">
                                                {cat.cat.desc}
                                            </blockquote>
                                            <h3>Said by user</h3>
                                        </Card.Body>
                                    </Container>
                                </Card>
                            </Carousel.Item>
                        </Carousel>
                        {/* {cat.cat.desc.map((desc, index) => {
                                <Carousel.Item key={index}>
                                    <Card className="text-light bg-dark mx-5 px-5">
                                        <Container>
                                            <Card.Body>
                                                <blockquote class="blockquote">
                                                    {desc}
                                                </blockquote>
                                                <h3>Said by user</h3>
                                            </Card.Body>
                                        </Container>
                                    </Card>
                                </Carousel.Item>
                            })
                            } */}
                    </Container>
                </Jumbotron>
                <Container className="border border-dark">
                    <Row>
                        <Col md={5}>
                            <div className="text-center my-2">
                                <Badge className="badge badge-pill badge-danger mx-5">Missing</Badge>

                            </div>
                        </Col>
                        <Col md={7} className="border">
                            <Table borderless size="lg">
                                <tbody>

                                    <tr>
                                        <td>Last fed:</td>
                                        <td className="align-middle">{displayEatingTimes()}</td>
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
            </>
        }
        </>
    )
}

export default CatProfile
