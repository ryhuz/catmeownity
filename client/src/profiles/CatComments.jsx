import React from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import { decode } from "jsonwebtoken"
import { ListGroupItem } from 'react-bootstrap'
import { useState, useEffect } from 'react'

function CatComments({ desc, fetchCat }) {

    let token = localStorage.getItem('token')
    let user = decode(token);
    Axios.defaults.headers.common['x-auth-token'] = token;
    let { id } = useParams()
    const [ownComment, setOwnComment] = useState(false);

    console.log(desc)
    var moment = require('moment')
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
                <div className="d-flex bd-highlight mb-3">
                    <div className="font-weight-bold p-2 bd-highlight">
                        {desc.byUser.name}
                    </div>
                    <div className="font-weight-bold p-2 bd-highlight">
                        {desc.catDescription}
                    </div>
                    <div className="d-flex text-muted ml-auto p-2 bd-highlight">

                        <div>{moment(desc.createdAt).fromNow()}</div>
                        <div className="mx-4">
                            {ownComment && <div>
                                <button type="button" class="close" aria-label="Close" onClick={deleteCatDescription}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>}
                        </div>
                    </div>
                </div>
            </ListGroupItem>
        </div>
    )
}

export default CatComments
