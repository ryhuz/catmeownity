import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'

function AreaResult() {
    const [districts, setDistrics] = useState([])
    let { area } = useParams();

    /* useEffect(() => {
        async function fetchDistrict() {
            try {
                let resp = await Axios.get(`http://localhost:2000/profile/${user.user._id}`, {
                    headers: {
                        "x-auth-token": localStorage.getItem("token"),
                    },
                });
                if (cleanup) {
                    setUserDetails(resp.data.user);
                }
                return () => {
                    cleanup = false
                }
            } catch (e) {
                // setError(e.response.data.message);
            }
        }
        fetchDistrict()
    }, []) */

    return (
        <div>
            <h1>{area}</h1>
        </div>
    )
}

export default AreaResult
