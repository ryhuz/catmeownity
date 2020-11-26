import React from 'react';
import { NavLink } from 'react-router-dom';

function MostRecentComments({ comment }) {
    const moment = require('moment');
    
    return (
        <li>
            {`${comment.catDescription} - `}
            <NavLink to={`/cat/${comment.forCat._id}`}>{comment.forCat.names[0]}</NavLink>
            <div>
                <small className="text-muted">{moment(comment.createdAt).fromNow()}</small>
            </div>

        </li>
    )
}

export default MostRecentComments
