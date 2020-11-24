import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, FormFile, Image, InputGroup, Jumbotron, Row } from 'react-bootstrap'
import Axios from 'axios'
import SimilarCat from './SimilarCat';
import { NavLink, useParams } from 'react-router-dom';
import { decode } from "jsonwebtoken";

function RegisterCatContainer() {
    let { locationID } = useParams()
    const [breadCrumb, setBreadCrumb] = useState({
        street: "",
        district: "",
        locality: "",
        found: false
    });
    const [loading, setLoading] = useState(false);
    const [sameName, setSameName] = useState([]);
    const [imageFile, setImageFile] = useState({ file: null, url: null });
    const [form, setForm] = useState({
        name: "",
        breed: "",
        colour: "",
        gender: "",
        sterilised: false,
        comment: "",
        image: "",
        imgDesc: "",
    });
    const [err, setErr] = useState({
        name: "",
        breed: "",
        colour: "",
        gender: "",
        sterilised: "",
        comment: "",
        imgDesc: "",
    });

    useEffect(() => {
        async function fetchLocation() {
            try {
                let resp = await Axios.get(`http://localhost:8080/public/where/${locationID}`);
                setBreadCrumb({
                    street: resp.data.location.street,
                    district: resp.data.location.district.name,
                    locality: resp.data.location.district.locality,
                    found: true,
                });
            } catch (e) {
                // setError(e.response.data.message);
                console.log(e.response)
            }
        }
        fetchLocation()
    }, [locationID])
    function imageSelect(e) {
        if (e.target.files[0]) {
            setImageFile({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }
    }
    function remove() {
        document.querySelector('.form-control-file').value = null;
        setImageFile({ file: null, url: null })
    }
    function changeHandler(e) {
        setErr({
            ...err,
            [e.target.name]: "",
        })
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    async function blur() {
        setLoading(true);
        if (form.name !== "") {
            try {
                let data = { name: form.name }

                let exists = await Axios.post(`http://localhost:8080/public/same/${locationID}/`, data);
                if (exists.data.found) {
                    setSameName(exists.data.similarCats)
                    setLoading(false);
                    return;
                } else {
                    setSameName([])
                    setLoading(false);
                    return;
                }
            } catch (e) {
                setLoading(false);
                return;
            }
        }
        setLoading(false);
    }
    async function addCat() {
        function checkForErrors() {
            let errMsg = {
                name: "Please give this cat a name",
                breed: "Please enter the cat's breed",
                colour: "Please enter a colour",
                gender: "Please choose one",
                sterilised: "Please choose one",
                comment: "Please give the cat a description",
                imgDesc: "Please give the photo a description",
            };
            let final = {
                name: "",
                breed: "",
                colour: "",
                gender: "",
                sterilised: "",
                comment: "",
                imgDesc: "",
            };
            if (form.name === "") {
                final.name = errMsg.name;
            }
            if (form.breed === "") {
                final.breed = errMsg.breed;
            }
            if (form.colour === "") {
                final.colour = errMsg.colour;
            }
            if (form.sterilised === "") {
                final.sterilised = errMsg.sterilised;
            }
            if (form.comment === "") {
                final.comment = errMsg.comment;
            }
            if (imageFile.file && form.imgDesc === "") {
                final.comment = errMsg.comment;
            }
            setErr(final);
        }
        checkForErrors();
        let token = localStorage.getItem('token');
        let user = decode(token);
        Axios.defaults.headers.common['x-auth-token'] = token;
        let catData = {
            ...form,
            userID: user.user._id,
            location: locationID,
        };

        //include image
        if (imageFile.file) {
            const formData = new FormData();
            formData.append('file', imageFile.file);
            formData.append('upload_preset', 'catmeownity_cat');

            const cloudinary = 'https://api.cloudinary.com/v1_1/ryhuz/image/upload';

            let img = await Axios.post(cloudinary, formData);
            let imageURL = img.data.secure_url;

            catData.image = imageURL;
        }
        let resp = await Axios.post("http://localhost:8080/cats/add", catData);
    }
    return (
        <>
            <Jumbotron className='bg-secondary'>
                <div className="ml-5 pl-5">
                    <h1>Add a new cat</h1>
                </div>
            </Jumbotron>
            <Container>
                {/* Location at the top */}
                {breadCrumb.found &&
                    <div className="mb-4">
                        You are adding a cat to: <br />
                        <div>
                            <NavLink to='/search' className="mx-4"><code>{breadCrumb.locality}</code></NavLink> <small>>></small>
                            <NavLink to='/search' className="mx-4"><code>{breadCrumb.district}</code></NavLink> <small>>></small>
                            <NavLink to={`/location/${locationID}`} className="mx-4"><code>{breadCrumb.street}</code></NavLink>
                        </div>
                    </div>
                }
                <Form>
                    <hr />
                    <Form.Label>
                        <h5>Tell us more about this cat!</h5>
                    </Form.Label>
                    <hr />
                    <Form.Label>
                        <h5>Cat details</h5>
                    </Form.Label>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="formBasicName">
                                <Form.Control type="text" name="name" placeholder="Cat's name"
                                    onChange={changeHandler} onBlur={blur} />
                                {err.name !== "" &&
                                    <small className='text-danger'>{err.name}</small>
                                }
                            </Form.Group>
                            <Form.Group controlId="formBasicBreed">
                                <Form.Control type="text" name="breed" placeholder="Cat's breed (e.g. Singapura, British Shorthair)"
                                    onChange={changeHandler} />
                                {err.breed !== "" &&
                                    <small className='text-danger'>{err.breed}</small>
                                }
                            </Form.Group>
                            <Form.Group controlId="formBasicColour">
                                <Form.Control type="text" name="colour" placeholder="Cat's colour (e.g Calico, Brown Striped; comma separated)"
                                    onChange={changeHandler} />
                                {err.colour !== "" &&
                                    <small className='text-danger'>{err.colour}</small>
                                }
                            </Form.Group>
                            <Form.Group controlId="formBasicGender">
                                <Form.Control as="select" name="gender"
                                    onChange={changeHandler}>
                                    <option disabled selected>Cat's gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Not Sure</option>
                                </Form.Control>
                                {err.gender !== "" &&
                                    <small className='text-danger'>{err.gender}</small>
                                }
                            </Form.Group>
                            <Form.Group controlId="formBasicSter">
                                <Form.Control as="select" name="sterilised"
                                    onChange={changeHandler}>
                                    <option disabled selected>Is it sterilised?</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                    <option>Not Sure</option>
                                </Form.Control>
                                {err.sterilised !== "" &&
                                    <small className='text-danger'>{err.sterilised}</small>
                                }
                            </Form.Group>
                        </Col>
                        <Col>
                            <SimilarCat loading={loading} similar={sameName} />
                        </Col>
                    </Form.Row>
                    <hr />
                    <Form.Row>
                        <Col>
                            <Form.Label>
                                <h5>Give a description of the cat</h5>
                                <small>A short sentence telling us about it's personality!</small>
                            </Form.Label>
                            <Form.Group controlId="formBasicDesc">
                                <Form.Control as="textarea" name="comment" placeholder="This cat is cute and friendly"
                                    onChange={changeHandler} onBlur={blur} />
                                {err.comment !== "" &&
                                    <small className='text-danger'>{err.comment}</small>
                                }
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Label>
                                <h5>Add a cat picture</h5>
                                <small>optional</small>
                            </Form.Label>
                            {imageFile.file &&
                                <>
                                    <div className="text-center profile-image-upload my-4">
                                        <Image src={imageFile.url} />
                                    </div>
                                    <Form.Group controlId="formBasicImgDesc">
                                        <Form.Control type="text" name="imgDesc" placeholder="A short description about this picture"
                                            onChange={changeHandler} onBlur={blur} />
                                        {err.comment !== "" &&
                                            <small className='text-danger'>{err.comment}</small>
                                        }
                                    </Form.Group>
                                </>
                            }
                            <InputGroup className="border p-2 justify-content-between">

                                <FormFile className="" type="file" name="image" onChange={imageSelect} />
                                <InputGroup.Append>
                                    {imageFile.file &&
                                        <span className="btn pr-3 pt-1 text-danger" onClick={remove}>Remove upload</span>
                                    }
                                </InputGroup.Append>
                            </InputGroup>

                        </Col>
                    </Form.Row>
                    <hr />
                    <Form.Row>
                        <Button block variant="success" onClick={addCat} >Add this cat</Button>
                    </Form.Row>
                </Form>
            </Container>
        </>
    )
}

export default RegisterCatContainer
