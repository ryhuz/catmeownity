import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { Col, Row } from 'react-bootstrap'

function LocationResult({ district }) {
    const [locations, setLocations] = useState({ locations: [], found: false })

    useEffect(() => {
        async function fetchLocation() {
            try {
                let resp = await Axios.get(`http://localhost:2000/public/location/${district}`);
                console.log(resp.data)
                setLocations({ locations: resp.data.locations, found: true });
            } catch (e) {
                // setError(e.response.data.message);
                console.log(e.response)
            }
        }
        if (district !== "") {
            fetchLocation()
        }
    }, [district])

    function showLocations() {
        if (locations.found) {
            if (locations.locations.length > 0) {
                return (
                    <>
                        {locations.locations.map(location => (
                            <li key={location._id}>{location.street}</li>
                        ))}
                    </>
                )
            }else{
                return (
                    <>
                    No areas here with cats yet. Would you like to add one?
                    </>
                )
            }
        }
    }

    return (
        <div>
            <h3>Location</h3>
            {showLocations()}
        </div>
    )
}

export default LocationResult
