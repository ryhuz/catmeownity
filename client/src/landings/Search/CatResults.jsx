import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Axios from 'axios'

function CatResults() {
    const [info, setInfo] = useState({
        cats: [],
        street: "",
        found: false,
    })
    let { locationID } = useParams()

    useEffect(() => {
        async function fetchCats() {
            try {
                let resp = await Axios.get(`http://localhost:2000/public/cats/${locationID}`);
                setInfo({ cats: resp.data.cats, street: resp.data.location, found: true });
            } catch (e) {
                // setError(e.response.data.message);
                console.log(e.response)
            }
        }
        fetchCats()
    }, [locationID])

    function showCats() {
        if (info.found) {
            if (info.cats.length > 0) {
                /* display each cat */
                return (
                    <>
                        {info.cats.map(cat => (
                            <li key={cat._id} className='h6'>
                                {cat.names[0]}
                            </li>
                        ))}
                    </>
                )
            } else {
                return (
                    <>
                        No cats here yet. Would you like to add one?
                    </>
                )
            }
        }
    }
console.log(info)
    return (
        <div>
            <h3>Cats in the area</h3>
            <h4>
                {info.street}
            </h4>
            {showCats()}
        </div>
    )
}

export default CatResults
