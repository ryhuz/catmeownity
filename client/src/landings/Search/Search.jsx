import React from 'react'
import { NavLink } from 'react-router-dom'

function Search() {
    return (
        <div>
            <h1>Search</h1>
            <li>
            <NavLink to='/search/north'>North</NavLink>
            </li>
            <li>
            <NavLink to='/search/south'>South</NavLink>
            </li>
            <li>
            <NavLink to='/search/east'>East</NavLink>
            </li>
            <li>
            <NavLink to='/search/west'>West</NavLink>
            </li>
        </div>
    )
}

export default Search
