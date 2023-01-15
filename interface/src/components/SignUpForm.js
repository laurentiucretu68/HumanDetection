import {Button, Form} from "react-bootstrap";
import logo from '../images/sign-up-image.jpg';
import "../components/style.css"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosClient from "../utils/axiosInstance";

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [name, setName] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password.length < 6) {
            setError('Password must have minimum 5 characters')
            setTimeout(() => setError(''), 3000)
            return
        }
        if (password !== repeatPassword) {
            setError("Passwords doesn't match")
            setTimeout(() => setError(''), 3000)
            return
        }
        try {
            const {data} = await axiosClient().post('/signup', {
                email: email,
                password: password,
                name: name
            })
            if (data.success) {
                setError('Account successfully created')
                setName('')
                setEmail('')
                setPassword('')
                setRepeatPassword('')
                setTimeout(() => setSuccess(''), 3000)
            } else {
                setError('Email already used')
                setTimeout(() => setError(''), 6000)
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
            {
                success ?
                    <div className="message">
                        <p>
                            {success}
                            <span className="closeNotification closeNotification2" onClick={() => setSuccess('')}>x</span>
                        </p>
                    </div> : null
            }
            <div style={{backgroundColor: "#294E95", minHeight: "100vh", paddingTop: "5%"}}>
                <div className="login-container">
                    <div className="login-wallpaper">
                        <img src={logo} alt="Wallpaper" className="login-img"/>
                    </div>
                    <div className="login-div-form">
                        <h2>
                            Sign Up
                        </h2>
                        <h6 className="sign-up-question">
                            Already have an account? <a href="/login" className="login-text-color">Login</a>
                        </h6>
                        <Form className="login-form" onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicFullName">
                                <Form.Label>Full name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
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
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Repeat password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password again"
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                />
                            </Form.Group>
                            <br/>
                            <Button className="login-button" variant="primary" type="submit">
                                CREATE YOUR ACCOUNT
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm;