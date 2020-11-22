import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Axios from 'axios'
import { Card, Col, Container, Image, Jumbotron, Row } from 'react-bootstrap'

function CatResults() {
    const [info, setInfo] = useState({
        cats: [],
        street: "",
        found: false,
    })
    let { locationID } = useParams()

    useEffect(() => {
        async function fetchCats() {
            try {
                let resp = await Axios.get(`http://localhost:8080/public/cats/${locationID}`);
                setInfo({ cats: resp.data.cats, street: resp.data.location, found: true });
            } catch (e) {
                // setError(e.response.data.message);
                console.log(e.response)
            }
        }
        fetchCats()
    }, [locationID])

    function showCats() {
        if (info.found) {
            if (info.cats.length > 0) {
                /* display each cat */
                return (
                    <Row>
                        {info.cats.map(cat => (
                            <Col sm={3} key={cat._id}>
                                <NavLink to={`/cat/${cat._id}`} className="text-center">
                                    {/* IF HAVE IMAGE, DISPLAY IMAGE, ELSE PLACEHOLDER */}
                                    <Image src="http://placehold.it/200x200" width="100%" className="img-thumbnail" />
                                </NavLink>
                                <Card>
                                    <Card.Header>
                                        <NavLink to={`/cat/${cat._id}`} className='h6 nav-link'>
                                            {cat.names[0]}
                                        </NavLink>
                                    </Card.Header>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )
            } else {
                return (
                    <>
                        No cats here yet. Would you like to add one?
                    </>
                )
            }
        }
    }
    return (
        <>
            <Jumbotron className='bg-secondary'>
                <div className="ml-5 pl-5">
                    <h1>Cats in the area</h1>
                    <h4>
                        {info.street}
                    </h4>
                </div>
            </Jumbotron>
            <Container>
                {showCats()}
            </Container>
        </>
    )
}

export default CatResults
