import React, { useState, useEffect } from 'react'
import { Container, Jumbotron, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import AreaResult from './AreaResult';

function Search() {
    const [area, setArea] = useState("");

    let locality = ['North', 'South', 'Central', 'East', 'West', 'North-East', 'North-West']

    function showAreaButtons() {
        return (
            <Row sm={4} xs={3}>
                {locality.map((l, index) => (
                    <Col key={index} className="my-1">
                        <div className={`btn ${area === l ? 'btn-dark' : 'btn-outline-dark'} btn-block`}
                            onClick={() => (setArea(l))}>
                            {l}
                        </div>
                    </Col>
                ))}
            </Row>
        )
    }
    return (
        <>
            <Jumbotron className='bg-secondary'>
                <h1 className='text-center'>Search</h1>
                <Container>
                    {showAreaButtons()}
                </Container>
            </Jumbotron >
            {area !== "" &&
                <AreaResult area={area} />
            }
        </>
    )
}

export default Search
