import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'

function AreaResult() {
    const [districts, setDistricts] = useState({ districts: [], found: false })
    let { area } = useParams();

    useEffect(() => {
        async function fetchDistrict() {
            try {
                let resp = await Axios.get(`http://localhost:2000/public/district/${area}`);
                setDistricts({ districts: resp.data.districts, found: true });
            } catch (e) {
                // setError(e.response.data.message);
                console.log(e.response)
            }
        }
        fetchDistrict()
    }, [])

    function showDistricts() {
        if (districts.found) {
            if (districts.districts.length > 0) {
                return (
                    <>
                        {districts.districts.map(district => (
                        <li key={district._id}>{district.name}</li>
                        ))}
                    </>
                )
            }
        }
    }

    return (
        <div>
            <h1>{area}</h1>
            {showDistricts()}
        </div>
    )
}

export default AreaResult
