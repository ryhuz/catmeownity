import React from 'react'
import { useParams } from 'react-router-dom'

function AreaResult() {
    let { area } = useParams();

    return (
        <div>
            <h1>{area}</h1>
        </div>
    )
}

export default AreaResult
