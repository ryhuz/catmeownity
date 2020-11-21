import React, { useState, useEffect } from 'react'
import { Badge, Button, Card, Col, Row } from 'react-bootstrap'
import Axios from 'axios'

function ChooseLocation({ form, setForm }) {
    const [selected, setSelected] = useState("");
    const [area, setArea] = useState("");
    const [districts, setDistricts] = useState({ districts: [], found: false });
    useEffect(() => {
        async function fetchDistricts() {
            try {
                let resp = await Axios.get(`http://localhost:8080/public/district/all`);
                setDistricts({ districts: resp.data.districts, found: true });
            } catch (e) {
                // setError(e.response.data.message);
                console.log(e.response)
            }
        }
        fetchDistricts()
    }, [])

    let locality = ['North', 'South', 'Central', 'East', 'West', 'North-East', 'North-West']
    function setAreaToForm(id) {
        setForm({ ...form, location: id });
    }

    function showAreaButtons() {
        return (
            <Row>
                {locality.map((l, index) => (
                    <Col key={index}>
                        <div className={`btn ${area === l ? 'btn-dark' : 'btn-outline-dark'} btn-block`}
                            onClick={() => (setArea(l))}>
                            {l}
                        </div>
                    </Col>
                ))}
            </Row>
        )
    }
    function showDistrictsByArea() {
        if (area === "") {
            return (
                <h5>Select an area</h5>
            )
        } else {
            let list = districts.districts.filter(d => d.locality === area);
            return (
                <>
                    {list.map(district => (
                        <li key={district._id} onClick={() => (setAreaToForm(district._id))}>
                            {district.name}
                            {form.location === district._id &&
                                <Badge variant="primary">Selected</Badge>
                            }
                        </li>
                    ))}
                </>
            )
        }
    }

    return (
        <Card className="p-3 mx-auto mt-5">
            <Card.Body>
                <h5>Next, tell us where you live so we can show you cats in that area!</h5>
                <hr />
                {showAreaButtons()}
                <Card className="p-3 mx-auto mt-3">
                    {showDistrictsByArea()}
                </Card>
                <Row className="justify-content-around mt-3">
                    <Col sm={4}>
                        <Button block variant='outline-dark'>
                            Back
                    </Button>
                    </Col>
                    <Col sm={4}>
                        <Button block variant='dark'>
                            Next
                    </Button>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-2">
                    <Col sm={10}>
                        <Button block variant='danger' onClick={()=>(setAreaToForm(""))}>
                            Skip this step
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default ChooseLocation
