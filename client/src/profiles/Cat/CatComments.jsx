import React from 'react'
import Axios from 'axios'
import { useParams, NavLink } from 'react-router-dom'
import { decode } from "jsonwebtoken"
import { Col, ListGroupItem, Modal, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import ConfirmDeleteComment from './ConfirmDeleteComment'

function CatComments({ desc, fetchCat }) {

    let token = localStorage.getItem('token')
    let user = decode(token);
    Axios.defaults.headers.common['x-auth-token'] = token;
    let { id } = useParams()
    const [ownComment, setOwnComment] = useState(false);
    const [confirmDel, setConfirmDel] = useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState("")

    var moment = require('moment')
    function confirmDelComment(commentID) {
        setConfirmDel(true);
        setCommentIdToDelete(commentID)
    }

    async function deleteCatDescription() {
        try {
            await Axios.delete(`http://localhost:8080/auth/comment/${desc._id}/${user.user._id}/${id}`);
            fetchCat()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user && user.user._id === desc.byUser._id) {
            setOwnComment(true)
        } else {
            setOwnComment(false)
        }
    }, [])


    return (
        <div>
            <ListGroupItem>
                <Row>
                    <Col sm={2} className="p-2">
                        <NavLink exact to={`/profile/${desc.byUser._id}`}>{desc.byUser && desc.byUser.name}</NavLink>
                    </Col>
                    <Col className="p-2">
                        {desc.catDescription}
                    </Col>
                    <Col sm={2} className="d-flex text-muted p-2">
                        <div>{moment(desc.createdAt).fromNow()}</div>
                        <div className="mx-4">
                            {ownComment && <div>
                                <button type="button" className="close" aria-label="Close" onClick={() => confirmDelComment(desc._id)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>}
                        </div>
                    </Col>
                </Row>
            </ListGroupItem>
            <Modal show={confirmDel} onHide={() => (setConfirmDel(false))}>
                <ConfirmDeleteComment setConfirmDel={setConfirmDel} delComment={() => deleteCatDescription(commentIdToDelete)} />
            </Modal>
        </div>
    )
}

export default CatComments
