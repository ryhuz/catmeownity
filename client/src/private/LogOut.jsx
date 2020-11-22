import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';

function LogOut({ setValid }) {
    function logout() {
        localStorage.removeItem('token');
        setValid(false);
    }
    logout()
    return (
        <>
            <Redirect to="/" />
        </>
    )
}

export default LogOut
