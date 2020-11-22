import React, { useState, useEffect } from 'react'
import { Col, Button, Modal, Form, InputGroup, Label } from 'react-bootstrap'
import Axios from 'axios'
import { useParams } from 'react-router-dom';


function CatBio({ cat }) {

    let token = localStorage.getItem('token');
    let { id } = useParams();
    Axios.defaults.headers.common['x-auth-token'] = token;

    const [showEditCat, setShowEditCat] = useState(false);
    const [form, setForm] = useState({
        names: cat.cat.names,
        breed: cat.cat.breed,
        gender: cat.cat.gender,
        colour: cat.cat.colour,
    });
    const [addName, setAddName] = useState("")

    function changeHandler(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (e.target.name === "names") {
            setAddName(e.target.value)
        }
    }

    async function editCat() {
        try {
            await Axios.put(`http://localhost:8080/auth/cats/${id}`, form);
            setShowEditCat(false)
            window.location.reload() //not the best option but will do for now
        } catch (e) {
            console.log(e.response)
        }
    }

    function displayOtherNames() {
        let other = cat.cat.names.slice(1);
        return (
            <>
                {other.map((name, index) => (
                    <span key={index} className="font-italic h5">{name}{index < other.length - 1 && ', '}</span>
                ))}
            </>
        )
    }

    async function addButton() {
        setForm({
            names: cat.cat.names.push(addName)
        })
        try {
            await Axios.put(`http://localhost:8080/auth/cats/${id}`, form);
        } catch (e) {
            console.log(e.response)
        }
    }

    // console.log(addName)
    // console.log(form.names)
    return (
        <Col>
            <h1 className="my-2">{cat.cat.names[0]}</h1>
            {cat.cat.names.length > 1 &&
                <p>
                    <small>Also known as:</small>
                    <div>
                        {displayOtherNames()}
                    </div>
                </p>
            }
            <p>
                <small>Gender:</small>
                <div className="h5">
                    {cat.cat.gender}
                </div>
            </p>
            <p>
                <small>Breed:</small>
                <div className="h5">
                    {cat.cat.breed}
                </div>
            </p>
            <p>
                <small>Colour:</small>
                <div className="h5">
                    {cat.cat.colour}
                </div>
            </p>
            <button onClick={() => setShowEditCat(true)}>Edit</button>
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showEditCat}
                onHide={() => setShowEditCat(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Cat information
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <InputGroup>
                                <Form.Control type="text" placeholder="Enter name of cat" defaultValue={cat.cat.names} onChange={changeHandler} name="names" aria-describedby="basic-addon2" />
                                <InputGroup.Append>
                                    <Button variant="outline-secondary" onClick={addButton}>Add</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" type="select" onChange={changeHandler} defaultValue={cat.cat.gender} name="gender">
                                <option value="">Select One</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Not Sure">Not Sure</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Breed</Form.Label>
                            <Form.Control type="text" placeholder="Enter breed of cat" onChange={changeHandler} defaultValue={cat.cat.breed} name="breed" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Colour</Form.Label>
                            <Form.Control type="text" placeholder="Enter colour of cat" onChange={changeHandler} defaultValue={cat.cat.colour} name="colour" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                    <Button onClick={editCat}>Update</Button>
                </Modal.Footer>
            </Modal>
        </Col>
    )
}

export default CatBio
