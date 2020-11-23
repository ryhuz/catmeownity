import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Badge, Table, Accordion, Card, Button, Jumbotron, Carousel, Modal } from 'react-bootstrap'
import Axios from 'axios'
import { useParams } from 'react-router-dom';
import CatBio from './CatBio';
import { decode } from "jsonwebtoken";
import NotLoggedIn from '../private/NotLoggedIn';
import pic from '../nocatpic.png'

function CatProfile() {
    let token = localStorage.getItem('token')
    let user = decode(token);
    Axios.defaults.headers.common['x-auth-token'] = token;
    let { id } = useParams()
    const [cat, setCat] = useState({
        cat: null,
        defaultPhoto: null,
        found: false,
    });
    const [favourites, setFavourites] = useState([]);
    const [needToLogIn, setNeedToLogIn] = useState(false);

    /* get list of favourites */
    useEffect(() => {
        async function fetchFavourites() {
            try {
                let resp = await Axios.get(`http://localhost:8080/auth/user/get-favourites/${user.user._id}`);
                setFavourites(resp.data.favourites);
            } catch (e) {
                // setError(e.response.data.message);
                console.log(e.response)
            }
        }
        fetchFavourites()
    }, [])
    /* get cat data */
    useEffect(() => {
        async function fetchCat() {
            try {
                let resp = await Axios.get(`http://localhost:8080/public/cat/${id}`);
                let tempPhoto;
                if (resp.data.cat.photos.length > 0) {
                    tempPhoto = resp.data.cat.photos.find(photo => photo.isDefault)
                }
                setCat({ cat: resp.data.cat, defaultPhoto: tempPhoto, found: true });
                /* REDIRECT TO ERROR PAGE IF CAT NOT FOUND */
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
        return favourites.includes(id);
    }
    function missing() {
        let miss = cat.missing;
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
    async function followUnfollow() {
        if (!user) {
            setNeedToLogIn(true);
            return;
        }
        if (favourites.includes(id)) {
            await Axios.put(`http://localhost:8080/auth/user/${user.user._id}/unfavourite/${id}`);
            let temp = [...favourites];
            temp.splice(temp.indexOf(id), 1);
            setFavourites(temp);
        } else {
            try {
                await Axios.put(`http://localhost:8080/auth/user/${user.user._id}/favourite/${id}`);
                setFavourites([...favourites, id])
            } catch (e) {
                console.log("here");
                console.log(e.response)
            }
        }
    }

    return (
        <>{cat.found &&
            <>
                <Modal show={needToLogIn} onHide={() => (setNeedToLogIn(false))}>
                    <NotLoggedIn setNeedToLogIn={setNeedToLogIn} />
                </Modal>
                <Jumbotron>
                    <Container>
                        <Row>
                            {/* Cat main picture and follow button */}
                            <Col>
                                <img src={cat.defaultPhoto ? cat.defaultPhoto.image : pic} className="rounded thumbnail img-responsive mx-auto d-block " width="70%" />
                                {!cat.defaultPhoto &&
                                    <Row xs={1}>
                                        <Col className='text-center py-2'>
                                            {cat.cat.names[0]} doesn't have a picture yet.
                                        </Col>
                                        <Col className='text-center'>
                                            <div className='btn btn-success'>
                                                Add their first photo!
                                            </div>
                                        </Col>
                                    </Row>}
                                <div className="text-center h4 mt-3">
                                    {followed() ?
                                        <>
                                            <Button variant="outline-danger" onClick={followUnfollow}>
                                                <i className="fas fa-heart mx-2"></i> Following this cat
                                            </Button>
                                        </> :
                                        <>
                                            <Button variant="secondary" onClick={followUnfollow}>
                                                <i className="fas fa-cat mx-2"></i> Follow this cat
                                            </Button>
                                        </>
                                    }
                                </div>
                            </Col>
                            {/* Cat profile */}
                            <CatBio cat={cat} />
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
                                            <blockquote className="blockquote">
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

                        <Col md={7} className="border">
                            <Table borderless size="lg">
                                <tbody>

                                    <tr>
                                        <td>Last fed:</td>
                                        <td className="align-middle">{displayEatingTimes()}</td>
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
