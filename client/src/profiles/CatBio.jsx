import React, { useState, useEffect } from 'react'
import { Col, Button, Form, InputGroup, FormLabel } from 'react-bootstrap'
import Axios from 'axios'
import { useParams } from 'react-router-dom';


function CatBio({ cat, setCat, user, fetchCat }) {

    let token = localStorage.getItem('token');
    let { id } = useParams();
    Axios.defaults.headers.common['x-auth-token'] = token;

    useEffect(() => {
        setCat(cat)
    }, [])

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
            if (cat.cat.names.length > 1) {
                cat.cat.names.shift();
                cat.cat.names.unshift(addName);
                await Axios.put(`http://localhost:8080/auth/cats/${id}`, {
                    names: cat.cat.names,
                    gender: form.gender,
                    breed: form.breed,
                    colour: form.colour,
                });
            } else {
                await Axios.put(`http://localhost:8080/auth/cats/${id}`, form);
            }
            setShowEditCat(false)
            fetchCat();
        } catch (e) {
            console.log(e.response)
        }
    }

    function displayOtherNames() {
        let other = cat.cat.names.slice(1);
        return (
            <>
                {other.map((name, index) => (
                    <span key={index} className="font-italic h5 badge badge-pill badge-secondary">
                        {name}{index < other.length - 1 && ', '}
                        {user && showEditCat && <button type="button" className="close" aria-label="Close" onClick={() => {
                            (async () => {
                                let delName = cat.cat.names[index + 1];
                                await Axios.put(`http://localhost:8080/auth/cats/delname/${id}`, {
                                    names: delName
                                });
                                setShowEditCat(false)
                                fetchCat();
                            })();
                        }}>
                            <span aria-hidden="true">&times;</span>
                        </button>}
                    </span>
                ))
                }
            </>
        )
    }

    async function addButton() {
        try {
            await Axios.put(`http://localhost:8080/auth/cats/name/${id}`, {
                names: addName
            });
            fetchCat();
            setShowEditCat(false)
        } catch (e) {
            console.log(e.response)
        }
    }

    async function missing() {
        try {
            await Axios.put(`http://localhost:8080/auth/cats/${id}/missing`);
            fetchCat();
        } catch (error) {
            console.log(error)
        }

    }

    async function found() {
        try {
            await Axios.put(`http://localhost:8080/auth/cats/${id}/found`);
            fetchCat();
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Col>
            {/* Check if edit button is pressed then show edit form and update button */}
            {showEditCat ? <div>
                <InputGroup>
                    <Form.Control type="text" placeholder={`Not everyone calls this kitty ${cat.cat.names[0]}`} defaultValue={cat.cat.names[0]} onChange={changeHandler} name="names" aria-describedby="basic-addon2" />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={addButton}>Add</Button>
                    </InputGroup.Append>
                </InputGroup>
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
                    {/* Check if user is logged in then display edit button and if cat missing display missing button */}
                    {user ? <div><Button variant="outline-secondary" onClick={() => setShowEditCat(true)}>Edit</Button>{!cat.cat.missing ? <Button className="mx-2" variant="outline-danger" onClick={missing}>Haven't seen this kitty lately?</Button> : <Button className="mx-2" variant="outline-success" onClick={found}>Saw this kitty somewhere?</Button>}</div> : <div></div>}
                </div>}
        </Col>
    )
}

export default CatBio
