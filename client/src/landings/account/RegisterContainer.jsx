import Axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import ChooseLocation from './ChooseLocation';
import ProfilePic from './ProfilePic';
import Register from './Register';

const RegisterContainer = ({ setValid }) => {
    const [imageFile, setImageFile] = useState({ file: null, url: null });
    const [form, setForm] = useState({
        email: "",
        name: "",
        password: "",
    });
    const [home, setHome] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [showSection, setSection] = useState(1);
    const [loading, setLoading] = useState(false);
    const [lastErr, setLastErr] = useState(false);

    function changeHandler(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function register() {
        setLoading(true);
        try {
            //include image
            let userData = { ...form };
            if (imageFile.file) {
                const formData = new FormData();
                formData.append('file', imageFile.file);
                formData.append('upload_preset', 'catmeownity_user');

                const cloudinary = 'https://api.cloudinary.com/v1_1/ryhuz/image/upload';

                let img = await Axios.post(cloudinary, formData);
                let imageURL = img.data.secure_url;

                userData.image = imageURL;
            }
            //register user
            let resp = await Axios.post("http://localhost:8080/user/register", userData);
            // store token in local storage
            localStorage.setItem('token', resp.data.token);

            setErrMsg("");
            setLoading(false);
            setValid({
                valid: true,
                refreshed: false,
            });
            setHome(true);
        } catch (error) {
            console.log(error.response)
            setLastErr(true)
        }
    }

    if (home) return <Redirect to="/" />

    return (
        <Container>
            <h1>Register page</h1>
            {showSection === 1 &&
                <Register setValid={setValid} form={form} changeHandler={changeHandler} errMsg={errMsg} nextSection={() => setSection(2)} />
            }
            {showSection === 2 &&
                <ChooseLocation form={form} setForm={setForm} nextSection={() => setSection(3)} prevSection={() => setSection(1)} />
            }
            {showSection === 3 &&
                <ProfilePic imageFile={imageFile} setImageFile={setImageFile} register={register} prevSection={() => setSection(2)}
                loading={loading} lastErr={lastErr} setLastErr={setLastErr} />
            }
        </Container>
    )
}

export default RegisterContainer;
