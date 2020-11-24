import React from 'react'
import { ListGroupItem } from 'react-bootstrap'

function CatComments({ desc }) {
    console.log(desc)
    return (
        <div>
            <ListGroupItem>
                <div className="d-flex">
                    <div className="font-weight-bold mr-4">
                        {desc.reference.name}
                    </div>
                    <div>
                        {desc.comment}
                    </div>
                    <div>
                        {desc.createdAt}
                    </div>
                </div>
            </ListGroupItem>
        </div>
    )
}

export default CatComments
