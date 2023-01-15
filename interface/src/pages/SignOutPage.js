import  { useNavigate } from 'react-router-dom'
import {useEffect} from "react";
function SignOutPage() {
    const email = sessionStorage.getItem('user')
    const navigate = useNavigate()

    useEffect(() => {
        if (email) {
            sessionStorage.removeItem('user')
        }
        navigate("/")
    }, [])

    return (
        <>
        </>
    )
}

export default SignOutPage;