import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import LocationResult from './LocationResult'

function AreaResult() {
    const [districts, setDistricts] = useState({ districts: [], found: false })
    const [selectedDistrict, setSelectedDistrict] = useState("")
    let { area } = useParams();

    useEffect(() => {
        setSelectedDistrict("");
        async function fetchDistrict() {
            try {
                let resp = await Axios.get(`http://localhost:2000/public/district/${area}`);
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
        <div>
            <h1>{area}</h1>
            <hr />
            <Row>
                <Col md={6}>
                    {showDistricts()}
                </Col>
                <Col md={6}>
                    {selectedDistrict !== "" &&
                        <LocationResult district={selectedDistrict}/>
                    }
                </Col>
            </Row>

        </div>
    )
}

export default AreaResult
