import {Button, Container, Form} from "react-bootstrap";
import image from "../images/home-image.jpg";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosInstance from "../utils/axiosInstance";
import FormData from 'form-data';
import Spinner from 'react-bootstrap/Spinner';

const fileInput = React.createRef()

function HomePage() {
    const email = sessionStorage.getItem('user')
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [spinner, setSpinner] = useState(false)

    useEffect(() => {
        if (!email) {
            navigate("/login")
        }
    }, [])

    const handleSubmit = async (e) => {
        setSpinner(true)
        e.preventDefault()
        const formData = new FormData();
        formData.append("archive", fileInput.current.files[0]);
        formData.append("email", email);

        try {
            const {status} = await axiosInstance().post(`/archive/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (status === 200) {
                fileInput.current.value = ''
                setMessage(`File sent to email and can be download from dashboard`)
                setTimeout(() => setMessage(''), 10000)
            }
        } catch (err) {
            console.log(err)
        }
        setSpinner(false)
    }


    return (
        <>
            {
                message ?
                    <div className="message">
                        <p>
                            {message}
                            <span className="closeNotification closeNotification2"
                                  onClick={() => setMessage('')}>x</span>
                        </p>
                    </div> : null
            }
            <Container className="home-image-container">
                <img src={image} alt="Upload" className="home-img"/>
            </Container>
            <br/>
            <div className="upload-form">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control
                            required
                            type="file"
                            style={{height: 38}}
                            ref = {fileInput}
                        />
                    </Form.Group>
                    <Button
                        className="login-button"
                        variant="primary"
                        type="submit"
                    >
                        UPLOAD
                    </Button>
                    {
                        spinner ?
                            <>
                                <div className="spinner-container">
                                    <Spinner animation="border" role="status" className="spinner">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </div>
                            </>
                            : null

                    }
                </Form>
            </div>
        </>
    )
}

export default HomePage;