import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Axios from 'axios'

function CatResults() {
    const [cats, setCats] = useState([])
    let { locationID } = useParams()

    useEffect(() => {
        async function fetchCats() {
            try {
                let resp = await Axios.get(`http://localhost:2000/public/cats/${locationID}`);
                // setCats({ cats: resp.data.districts, found: true });
            } catch (e) {
                // setError(e.response.data.message);
                console.log(e.response)
            }
        }
        fetchCats()
    }, [locationID])
    
    return (
        <div>
            <h3>Cats in the area</h3>
            {locationID}
        </div>
    )
}

export default CatResults
