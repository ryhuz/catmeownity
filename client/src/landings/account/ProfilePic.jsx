import React, { useState } from 'react'
import { Button, Card, Col, Form, FormControl, FormFile, Image, Row } from 'react-bootstrap'
import Axios from 'axios'

function ProfilePic({ setImageFile, imageFile, register }) {
    function imageSelect(e) {
        setImageFile({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        });
    }
    return (
        <Card className="p-3 mx-auto mt-5">
            <Card.Body>
                <h5>Would you like to upload a profile photo?</h5>
                <hr />
                {imageFile.file &&
                    <div className="text-center profile-image-upload my-4">
                        <Image src={imageFile.url} />
                    </div>
                }
                <Row>
                    <Col>
                        <Form>
                            <FormFile className="border p-2" type="file" name="image" onChange={imageSelect} />
                        </Form>
                    </Col>
                </Row>
                <Row className="justify-content-around mt-3">
                    <Col sm={4}>
                        <Button block variant='outline-dark'>
                            Back
                    </Button>
                    </Col>
                    <Col sm={4}>
                        <Button block variant='dark' onClick={register}>
                            Upload and complete sign-up
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-2">
                    <Col sm={10}>
                        <Button block variant='danger' onClick={register}>
                            Skip this step and complete sign-up
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card >
    )
}

export default ProfilePic
