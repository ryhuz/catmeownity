import React from 'react'
import { Redirect } from 'react-router-dom';
import Loading from '../Loading';

function LogOut({ setValid, valid }) {

    function logout() {
        localStorage.removeItem('token');
        setValid({
            valid: false,
            refreshed: false,
        });
    }
    setTimeout(() => {
        logout()
    }, 1500);

    if (!valid.valid) {
        return <Redirect to="/" />
    }

    return (
        <>
            <Loading />
        </>
    )
}

export default LogOut
