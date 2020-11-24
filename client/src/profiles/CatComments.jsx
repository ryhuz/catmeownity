import React from 'react'
import { ListGroupItem } from 'react-bootstrap'

function CatComments({ desc }) {
    var moment = require('moment')
    console.log(desc)
    return (
        <div>
            <ListGroupItem>
                <div className="d-flex bd-highlight mb-3">
                    <div className="font-weight-bold p-2 bd-highlight">
                        {desc.reference.name}
                    </div>
                    <div className="font-weight-bold p-2 bd-highlight">
                        {desc.comment}
                    </div>
                    <div className="text-muted ml-auto p-2 bd-highligh">
                        {moment(desc.createdAt).fromNow()}
                    </div>
                </div>
            </ListGroupItem>
        </div>
    )
}

export default CatComments
