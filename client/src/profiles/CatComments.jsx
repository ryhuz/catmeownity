import React from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import { decode } from "jsonwebtoken"
import { ListGroupItem } from 'react-bootstrap'

function CatComments({ desc, fetchCat }) {

    let token = localStorage.getItem('token')
    let user = decode(token);
    Axios.defaults.headers.common['x-auth-token'] = token;
    let { id } = useParams()

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
                            <div>
                                <button type="button" class="close" aria-label="Close" onClick={deleteCatDescription}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ListGroupItem>
        </div>
    )
}

export default CatComments
