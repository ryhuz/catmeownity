import React, { useState } from 'react'
import { Col, Button, Form, InputGroup } from 'react-bootstrap'
import Axios from 'axios'
import { useParams } from 'react-router-dom';


function CatBio({ cat }) {

    let token = localStorage.getItem('token');
    let { id } = useParams();
    Axios.defaults.headers.common['x-auth-token'] = token;

    const [showEditCat, setShowEditCat] = useState();
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
            await Axios.put(`http://localhost:8080/auth/cats/${id}`, {
                names: form.names,
                breed: form.breed,
                gender: form.gender,
                colour: form.colour,
            });
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
        try {
            await Axios.put(`http://localhost:8080/auth/cats/name/${id}`, {
                names: addName
            });
            window.location.reload() //not the best option but will do for now
        } catch (e) {
            console.log(e.response)
        }
    }


    // console.log(addName)
    console.log(cat)
    return (
        <Col>
            {showEditCat ? <div>
                {/* <h1 className="my-2"> */}
                <InputGroup>
                    <Form.Control type="text" placeholder="Enter name of cat" defaultValue={cat.cat.names[0]} onChange={changeHandler} name="names" aria-describedby="basic-addon2" />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={addButton}>Add</Button>
                    </InputGroup.Append>
                </InputGroup>
                {/* </h1> */}
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
                        <Form.Control as="select" type="select" onChange={changeHandler} defaultValue={cat.cat.gender} name="gender">
                            <option value="">Select One</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Not Sure">Not Sure</option>
                        </Form.Control>
                    </div>
                </p>
                <p>
                    <small>Breed:</small>
                    <div className="h5">
                        <Form.Control type="text" placeholder="Enter breed of cat" onChange={changeHandler} defaultValue={cat.cat.breed} name="breed" />
                    </div>
                </p>
                <p>
                    <small>Colour:</small>
                    <div className="h5">
                        <Form.Control type="text" placeholder="Enter colour of cat" onChange={changeHandler} defaultValue={cat.cat.colour} name="colour" />
                    </div>
                </p>
                <div className="d-flex justify-content-between">
                    <Button variant="outline-secondary" onClick={() => setShowEditCat(true)}>Edit</Button>
                    <Button variant="outline-secondary" onClick={editCat}>Update</Button>
                </div>
            </div> : <div>
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
                    <Button variant="outline-secondary" onClick={() => setShowEditCat(true)}>Edit</Button>
                </div>}
        </Col>
    )
}

export default CatBio
