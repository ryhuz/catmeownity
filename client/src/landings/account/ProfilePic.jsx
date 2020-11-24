import React from 'react'
import { Button, Card, Col, FormFile, Image, InputGroup, Modal, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import Loading from '../../Loading';

function ProfilePic({ setImageFile, imageFile, register, prevSection, loading, setLastErr, lastErr }) {
    function imageSelect(e) {
        if (e.target.files[0]) {
            setImageFile({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }
    }
    function remove() {
        document.querySelector('.form-control-file').value = null;
        setImageFile({ file: null, url: null })
    }
    return (
        <>
            <Modal show={lastErr} onHide={() => (setLastErr(false))}>
                <Modal.Header closeButton>
                    <Modal.Title>Error creating your account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NavLink to='/' className='btn btn-block btn-outline-danger'>Back to home</NavLink>
                </Modal.Body>
            </Modal>
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
                            <InputGroup className="border p-2 justify-content-between">
                                <FormFile className="" type="file" name="image" onChange={imageSelect} />
                                <InputGroup.Append>
                                    {imageFile.file &&
                                        <span className="btn pr-3 pt-1 text-danger" onClick={remove}>Remove upload</span>
                                    }
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col sm={8}>
                            <Row className="justify-content-around mt-3">
                                <Col sm={6}>
                                    <Button block variant='outline-dark' onClick={() => prevSection(false)}>
                                        Back
                                </Button>
                                </Col>
                                <Col sm={6}>
                                    {imageFile.file ?
                                        <Button block variant='dark' onClick={register}>
                                            Upload and complete sign-up
                            </Button> :
                                        <Button block variant='danger' onClick={register}>
                                            Skip this step and complete sign-up
                            </Button>
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {loading &&
                        <Row className="justify-content-center">
                            <Col sm={2}>
                                <Loading />
                            </Col>
                        </Row>
                    }
                </Card.Body>
            </Card >
        </>
    )
}

export default ProfilePic
