import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Card, Col, Container, Row } from 'react-bootstrap'
import LocationResult from './LocationResult'

function AreaResult({ area }) {
    const [districts, setDistricts] = useState({ districts: [], found: false })
    const [selectedDistrict, setSelectedDistrict] = useState("")

    useEffect(() => {
        setSelectedDistrict("");
        async function fetchDistrict() {
            try {
                let resp = await Axios.get(`http://localhost:8080/public/district/${area}`);
                setDistricts({ districts: resp.data.districts, found: true });
            } catch (e) {
                // setError(e.response.data.message);
                console.log(e.response)
            }
        }
        fetchDistrict()
    }, [area])

    function showDistricts() {
        if (districts.found) {
            if (districts.districts.length > 0) {
                /* sorting the districts by name */
                districts.districts.sort(function (a, b) {
                    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                });
                /* display each district */
                return (
                    <>
                        {districts.districts.map(district => (
                            <li key={district._id} className='d-flex'>
                                <div className='nav-link' onClick={() => { setSelectedDistrict(district._id) }}>
                                    {district.name}
                                </div>
                            </li>
                        ))}
                    </>
                )
            }
        }
    }

    return (
        <Container>
            <h1>{area}</h1>
            <hr />
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <h3>Districts</h3>
                        </Card.Header>
                        {showDistricts()}
                    </Card>
                </Col>
                <Col md={6}>
                    {selectedDistrict !== "" &&
                        <LocationResult district={selectedDistrict} />
                    }
                </Col>
            </Row>

        </Container>
    )
}

export default AreaResult
