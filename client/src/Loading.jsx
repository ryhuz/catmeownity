import React from 'react'
import { Container, Image } from 'react-bootstrap'
import loading from './loading.gif'

function Loading() {
    return (
        <Container className="text-center pt-5">
            <Image src={loading} />
        </Container>
    )
}

export default Loading
