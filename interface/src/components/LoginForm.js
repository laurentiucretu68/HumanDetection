import {Button, Form} from "react-bootstrap";
import logo from '../images/login-image.jpg';
import "../components/style.css"
import axiosClient from "../utils/axiosInstance";
import {useState} from "react";
import {useNavigate} from 'react-router-dom'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [remember, setRemember] = useState(0)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axiosClient().post('/login', {
                email: email,
                password: password
            })
            if (data.success) {
                sessionStorage.setItem('user', email)
                navigate("/")
            } else {
                setError('Invalid username or password')
                setTimeout(() => setError(''), 3000)
            }
        } catch (e) {
            console.log(e)
            setError('Database error')
            setTimeout(() => setError(''), 3000)
        }
    }

    return (
        <>
            {
                error ?
                    <div className="error">
                        <p>
                            {error}
                            <span className="closeNotification closeNotification2" onClick={() => setError('')}>x</span>
                        </p>
                    </div> : null
            }
            <div style={{backgroundColor: "#294E95", minHeight: "100vh", paddingTop: "5%"}}>
                <div className="login-container">
                    <div className="login-div-form">
                        <h2>
                            Login
                        </h2>
                        <h6 className="sign-up-question">
                            Don't have an account yet? <a href="/sign-up" className="login-text-color">Sign up</a>
                        </h6>
                        <Form className="login-form" onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter 6 characters or more"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">*/}
                            {/*    <Form.Check*/}
                            {/*        className="sign-up-question"*/}
                            {/*        type="checkbox"*/}
                            {/*        label="Remember me"*/}
                            {/*        value={remember}*/}
                            {/*        onClick={(e) => setRemember(1)}*/}
                            {/*    />*/}
                            {/*</Form.Group>*/}
                            <br/>
                            <Button className="login-button" variant="primary" type="submit">
                                LOGIN
                            </Button>
                        </Form>
                    </div>
                    <div className="login-wallpaper">
                        <img src={logo} alt="Wallpaper" className="login-img"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm;