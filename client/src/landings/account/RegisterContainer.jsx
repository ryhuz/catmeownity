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
    const [showSection, setShowSection] = useState({
        register: true,
        location: false,
        pic: false,
    });

    function nextSectionLocation(bool) {
        setShowSection({ ...showSection, location: bool })
    }
    function nextSectionPic(bool) {
        setShowSection({ ...showSection, pic: bool })
    }

    function changeHandler(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function register() {
        try {
            //include image
            let userData = { ...form };
            if (imageFile.file) {
                const formData = new FormData();
                formData.append('file', imageFile.file);
                formData.append('upload_preset', 'catmeownity');

                const cloudinary = 'https://api.cloudinary.com/v1_1/ryhuz/image/upload';

                let img = await Axios.post(cloudinary, formData);
                let imageURL = img.data.secure_url;

                userData.image = imageURL;
            }
            //register user
            let resp = await Axios.post("http://localhost:8080/user/register", userData);
            console.log(resp.data.user)
            // store token in local storage
            localStorage.setItem('token', resp.data.token);

            setErrMsg("");
            setValid({
                valid: true,
                refreshed: false,
              });
            setHome(true);
        } catch (error) {
            console.log(error.response)
        }
    }

    if (home) return <Redirect to="/" />

    return (
        <Container>
            <h1>Register page</h1>
            {showSection.register &&
                <Register setValid={setValid} email={form.email} changeHandler={changeHandler} errMsg={errMsg} nextSection={nextSectionLocation} />
            }
            {showSection.location &&
                <ChooseLocation form={form} setForm={setForm} nextSection={nextSectionPic} prevSection={nextSectionLocation} />
            }
            {showSection.pic &&
                <ProfilePic imageFile={imageFile} setImageFile={setImageFile} register={register} prevSection={nextSectionPic} />
            }
        </Container>
    )
}

export default RegisterContainer;
