import React, { useState, useEffect } from 'react'
import { Badge, Button, Card, Col, Row } from 'react-bootstrap'
import Axios from 'axios'

function ChooseLocation({ form, setForm, nextSection, prevSection }) {
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
            <Row sm={4} xs={3}>
                {locality.map((l, index) => (
                    <Col key={index} className="my-1">
                        <div className={`btn ${area === l ? 'btn-info' : 'btn-outline-info'} btn-block`}
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
                <Row sm={4} xs={3}>
                    {list.map(district => (
                        <Col key={district._id} onClick={() => (setAreaToForm(district._id))} className="my-1">
                            <div className={`btn ${selected === district.name ? 'btn-success' : 'btn-outline-success'} btn-block`}
                                onClick={() => (setSelected(district.name))}>
                                {district.name}
                            </div>
                        </Col>
                    ))}
                </Row>
            )
        }
    }
    function skip() {
        setAreaToForm("");
        nextSection();
    }
    return (
        <Card className="p-3 mx-auto mt-5">
            <Card.Body>
                <h5>Next, tell us where you live so we can show you cats in that area!</h5>
                <hr />
                <Card className="p-3 mx-auto mt-3">
                    {showAreaButtons()}
                </Card>
                <Card className="p-3 mx-auto mt-3">
                    {showDistrictsByArea()}
                </Card>
                <Row className='justify-content-center'>
                    <Col sm={8}>
                        <Row className="justify-content-around mt-3">
                            <Col sm={6}>
                                <Button block variant='outline-dark' onClick={() => prevSection(false)}>
                                    Back
                                </Button>
                            </Col>
                            <Col sm={6}>
                                <Button block variant='dark' onClick={() => nextSection(true)}>
                                    Next
                                </Button>
                            </Col>
                        </Row>
                        <Row className="justify-content-center mt-2">
                            <Col>
                                <Button block variant='danger' onClick={skip}>
                                    Skip this step
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default ChooseLocation
