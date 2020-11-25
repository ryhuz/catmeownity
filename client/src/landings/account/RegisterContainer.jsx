import Axios from 'axios';
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import ProfilePic from './ProfilePic';
import Register from './Register';

const RegisterContainer = ({ setValid }) => {
    const [imageFile, setImageFile] = useState({ file: null, url: null });
    const [home, setHome] = useState(false);
    const [showSection, setSection] = useState(1);
    const [lastErr, setLastErr] = useState(false);

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
            setLoading(false);
        }
    }

    if (home) return <Redirect to="/" />

    return (
        <Container>
            <h1>Register page</h1>
            {showSection === 1 &&
                <Register nextSection={() => setSection(2)} />
            }
            {showSection === 2 &&
                <ProfilePic imageFile={imageFile} setImageFile={setImageFile} register={register} prevSection={() => setSection(1)}
                lastErr={lastErr} setLastErr={setLastErr} />
            }
        </Container>
    )
}

export default RegisterContainer;
