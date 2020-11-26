import React from 'react'
import { Carousel, Container, Image, Jumbotron } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import '../App.css'

function Home() {
    return (
        <div className="container-bg">
            <Jumbotron id="jumbo" className='text-center jumbotop'>
            <Image id="bgtest" src="" />
                <div id="search-container">
                    <div id="title-container">
                        <h1 style={{color: "black"}}>CatMeownity</h1>
                        <p className="text-dark">
                            Neighbourhood and community cats in an app
                        </p>
                    </div>
                    <Container id="search-bar">
                        <NavLink to='/search' className='btn btn-block btn-dark btn-lg mt-5'>Search for a community with cats</NavLink>
                    </Container>
                </div>
            </Jumbotron>
            <div className="learn-container">
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
            </div>
        </div>
    )
}

export default Home