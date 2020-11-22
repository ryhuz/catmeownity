import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Badge, Table, Accordion, Card, Button, Jumbotron, Carousel } from 'react-bootstrap'

function CatBio({ cat }) {
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
    return (
        <Col>
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
        </Col>
    )
}

export default CatBio
