import React from 'react'
import { Carousel, Col, Container, Image, Jumbotron } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import '../App.css'

function Home() {
    return (
        <>
            <Jumbotron id="jumbo" className='text-center jumbotop'>
                <Col xs={5} className="mx-auto">
                    <Container id="title-container" className="py-2">
                        <h1 className="text-black my-3">CatMeownity</h1>
                        <p className="text-dark">
                            Neighbourhood and community cats in an app
                        </p>
                    </Container>
                    <div>
                        <NavLink to='/search' className='btn btn-block btn-dark btn-lg mt-5'>Search for a community with cats</NavLink>
                    </div>
                </Col>
            </Jumbotron>
            <div className="learn-container">
                <Container>
                    <h4 className="text-center p-4">Learn more about cats</h4>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                id="trivia1"
                                className="d-block w-100"
                                src="http://placehold.it/800x300"
                                alt="First slide"
                            />
                            <Carousel.Caption bg="dark" className="text-dark">
                                <h3>First Cat Trivia</h3>
                                <p>Cats are awesome</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="http://placehold.it/800x300"
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>Second Cat Trivia</h3>
                                <p>Not all cats like to be pet</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="http://placehold.it/800x300"
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>Third Cat Trivia</h3>
                                <p>Don't leave the food lying around</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Container>
            </div>
        </>
    )
}

export default Home