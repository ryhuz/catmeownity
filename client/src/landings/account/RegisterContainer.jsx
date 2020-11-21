import Axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import ChooseLocation from './ChooseLocation';
import ProfilePic from './ProfilePic';
import Register from './Register';

const RegisterContainer = ({ setValid }) => {
    const [imageFile, setImageFile] = useState({ file: null, url: null });
    const [form, setForm] = useState({});
    const [home, setHome] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    function changeHandler(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function register() {
        try {
            //register user
            console.log(form)
            let resp = await Axios.post("http://localhost:8080/user/register", form);
            //store token in local storage
            localStorage.setItem('token', resp.data.token);
            setValid(true);
            setHome(true);
        } catch (error) {
            setErrMsg(error.response.data.message);
            console.log(error.response)

        }
    }

    if (home) return <Redirect to="/" />

    return (
        <Container>
            <h1>Register page</h1>
            <Register setValid={setValid} changeHandler={changeHandler} errMsg={errMsg} />
            <ChooseLocation form={form} setForm={setForm} />
            <ProfilePic imageFile={imageFile} setImageFile={setImageFile} register={register} />
        </Container>
    )
}

export default RegisterContainer;
