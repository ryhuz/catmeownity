import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Table, Accordion, Card, Button, Jumbotron, Modal, ListGroup, InputGroup, Form, Tab, Tabs, ListGroupItem, Image } from 'react-bootstrap'
import Axios from 'axios'
import { NavLink, useParams } from 'react-router-dom';
import CatBio from './CatBio';
import { decode } from "jsonwebtoken";
import NotLoggedIn from '../private/NotLoggedIn';
import CatComments from '../profiles/CatComments';
import pic from '../resources/nocatpic.png'
import CatPhotoUpload from './CatPhotoUpload';

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
    const [comment, setComment] = useState({
        reference: id
    })
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [eventKey, setEventKey] = useState(false);
    const moment = require('moment');

    /* get curr user list of favourites */
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
        fetchCat()
    }, [id])
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
    // function displayLocations() {
    //     let places = cat.cat.locations;
    //     if (places.length > 0) {
    //         return (
    //             <>
    //                 {places.map((place, index) => (
    //                     <li key={index} >{place.street}</li>
    //                 ))}
    //             </>
    //         )
    //     } else {
    //         return (
    //             <>
    //                 <span>Not Sure</span>
    //             </>
    //         )
    //     }
    // }
    function followed() {
        return favourites.includes(id);
    }
    function missing() {
        if (cat.cat.missing) {
            return (
                <Container className="bg-danger mt-3">
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
                console.log(e.response)
            }
        }
    }
    async function postComment() {
        try {
            await Axios.post(`http://localhost:8080/auth/comment/${id}/desc/${user.user._id}`, comment)
            fetchCat();
        } catch (error) {
            console.log(error)
        }
    }
    function handleComment(e) {
        setComment({ ...comment, [e.target.name]: e.target.value });
    }
    function addPhoto() {
        fetchCat();
    }

    function showCatPhotos() {
        return (
            <>
                {cat.cat.photos.map(photo => (
                    <Col>
                        <Card>
                            <Image thumbnail rounded src={photo.image} className="img-responsive" width="100%" />
                            <Card.Body>
                                {photo.desc}
                                <div>-{photo.uploadedBy.name}</div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
                }
            </>
        )
    }

    (async () => {
        if (eventKey) {
            return "0"
        } else {
            return "1"
        }
    })(eventKey);

    function checkLoginForUpload(){
        if (user){
            setUploadingPhoto(true)
        }else{
            setNeedToLogIn(true);
        }
    }

    return (
        <>{cat.found &&
            <>
                <Modal show={needToLogIn} onHide={() => (setNeedToLogIn(false))}>
                    <NotLoggedIn setNeedToLogIn={setNeedToLogIn} />
                </Modal>
                <Modal show={uploadingPhoto} onHide={() => (setUploadingPhoto(false))} size="lg">
                    <CatPhotoUpload setUploadingPhoto={setUploadingPhoto} defaultPhoto={cat.defaultPhoto} addPhoto={addPhoto} id={id} user={user} />
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
                                            <div className='btn btn-success' onClick={checkLoginForUpload}>
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
                            <CatBio cat={cat} setCat={setCat} user={user} fetchCat={fetchCat} />
                        </Row>
                    </Container>
                    {missing()}
                </Jumbotron>
                {/* Tabs nav */}
                <Tabs defaultActiveKey="comment" id="uncontrolled-tab-example">
                    {/* Comments Tab */}
                    <Tab eventKey="comment" title="Comments">
                        <Accordion defaultActiveKey="0" className="scroll">
                            <Card>
                                <Card.Header>
                                    {eventKey === false && <div><div>
                                        <ListGroupItem>
                                            <div className="d-flex bd-highlight mb-3">
                                                <div className="font-weight-bold p-2 bd-highlight">
                                                    {/* {cat.cat.desc[cat.cat.desc.length - 1].reference.name} */}
                                                </div>
                                                <div className="font-weight-bold p-2 bd-highlight">
                                                    {/* {cat.cat.desc[cat.cat.desc.length - 1].comment} */}
                                                </div>
                                                <div className="text-muted ml-auto p-2 bd-highligh">
                                                    {/* {moment(cat.cat.desc[cat.cat.desc.length - 1].createdAt).fromNow()} */}
                                                </div>
                                            </div>
                                        </ListGroupItem>
                                    </div>
                                        <div>
                                            <ListGroupItem>
                                                <div className="d-flex bd-highlight mb-3">
                                                    <div className="font-weight-bold p-2 bd-highlight">
                                                        {/* {cat.cat.desc[cat.cat.desc.length - 2].reference.name} */}
                                                    </div>
                                                    <div className="font-weight-bold p-2 bd-highlight">
                                                        {/* {cat.cat.desc[cat.cat.desc.length - 2].comment} */}
                                                    </div>
                                                    <div className="text-muted ml-auto p-2 bd-highligh">
                                                        {/* {moment(cat.cat.desc[cat.cat.desc.length - 2].createdAt).fromNow()} */}
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                        </div>
                                        <div>
                                            <ListGroupItem>
                                                <div className="d-flex bd-highlight mb-3">
                                                    <div className="font-weight-bold p-2 bd-highlight">
                                                        {/* {cat.cat.desc[cat.cat.desc.length - 3].reference.name} */}
                                                    </div>
                                                    <div className="font-weight-bold p-2 bd-highlight">
                                                        {/* {cat.cat.desc[cat.cat.desc.length - 3].comment} */}
                                                    </div>
                                                    <div className="text-muted ml-auto p-2 bd-highligh">
                                                        {/* {moment(cat.cat.desc[cat.cat.desc.length - 3].createdAt).fromNow()} */}
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                        </div></div>}
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1" onClick={() => setEventKey(!eventKey)}>
                                        {eventKey ? 'close' : 'show all comments...'}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <ListGroup>
                                            {cat.cat.desc.reverse().map((el) => (
                                                <CatComments desc={el} key={el._id} />
                                            ))}
                                        </ListGroup>
                                        <InputGroup className="my-3">
                                            <Form.Control type="text" placeholder="Enter your comment" name="comment" aria-describedby="basic-addon2" onChange={handleComment} />
                                            <InputGroup.Append>
                                                <Button variant="outline-secondary" onClick={postComment}>Add</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Tab>
                    {/* Photo Tab */}
                    <Tab eventKey="photos" title="Photo">
                        <Row>
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
                                                <Row md={4} sm={3} className="mx-5">
                                                    {user &&
                                                        <Col>
                                                            <Card onClick={() => setUploadingPhoto(true)}>
                                                                <Image thumbnail rounded src={pic} className="img-responsive" width="100%" />
                                                                <Card.Body>
                                                                    <i className="fas fa-plus"></i> Add a new photo
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>}
                                                    {showCatPhotos()}
                                                </Row>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </Col>
                        </Row>
                    </Tab>
                    {/* Feeding Tab */}
                    <Tab eventKey="feeding" title="Feeding">
                        <Col className="border">
                            <Table borderless size="lg">
                                <tbody>
                                    <tr>
                                        <td>Last fed:</td>
                                        <td className="align-middle">{displayEatingTimes()}</td>
                                    </tr>
                                    <tr>
                                        <td>Residing:</td>
                                        {/* <td>{displayLocations()}</td> */}
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Tab>
                </Tabs>
            </>
        }
        </>
    )
}

export default CatProfile
