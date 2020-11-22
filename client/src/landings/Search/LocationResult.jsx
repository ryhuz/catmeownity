import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Axios from 'axios'
import { Card } from 'react-bootstrap'

function LocationResult({ district }) {
    const [locations, setLocations] = useState({ locations: [], found: false })

    useEffect(() => {
        async function fetchLocation() {
            try {
                let resp = await Axios.get(`http://localhost:8080/public/location/${district}`);
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
                /* sorting the districts by name */
                locations.locations.sort(function (a, b) {
                    var nameA = a.street.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.street.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA >= nameB) {
                        return 1;
                    }
                    return null
                });
                /* display each location or street */
                return (
                    <>
                        {locations.locations.map(location => (
                            <li className='d-flex'>
                                <NavLink to={`/location/${location._id}`} key={location._id} className='nav-link'>
                                    {location.street}
                                </NavLink>
                            </li>
                        ))}
                    </>
                )
            }
        }
    }

    return (
        <Card>
            <Card.Header>
                <h3>Location</h3>
            </Card.Header>
            {showLocations()}
            <hr/>
            <li className='d-flex flex-column nav-link'>
                <p>
                    Do we not have the location you're looking for?
                </p>
                <p>
                    <div className='btn btn-secondary'>Add it here!</div>
                </p>
            </li>
        </Card>
    )
}

export default LocationResult
