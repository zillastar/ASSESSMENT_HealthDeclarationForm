import { useRef, useState } from "react";
import axios from 'axios';

const RegisterScreen = () => {
    let baseUrl;
    // baseURL for API call between when it is deployed and in development (localhost) stage
    window.location.hostname.includes("localhost") ? baseUrl = "http://localhost:3000" : baseUrl = "https://health-assessment-form.onrender.com";
    console.log(baseUrl);

    // useRef to pull register data (username and password)
    const userName = useRef(null);
    const email = useRef(null)
    const password = useRef(null);
    const token = localStorage.getItem("token");

    const [emailExists, setEmailExists] = useState(null);

    if (token != null) {
        window.location.href = "/profile";
        return;
    }

    const registerButton = () => {
        const checkValidEmail = /^\S+@\S+\.\S+$/;

        if (userName.current.value === "" || email.current.value === "" || password.current.value === "") {
            alert("Please fill in the blanks!");
            return;
        }

        if (!checkValidEmail.test(email.current.value.trim())) {
            alert("Invalid email address");
            return;
        }

        // send information to backend to create user
        axios.post(`${baseUrl}/api/user`, {
            username: (userName.current.value).trim(),
            email: (email.current.value).trim(),
            password: (password.current.value).trim()
        }).then(() => {
            localStorage.setItem("fromRegister", "exists");
        }).then(() => {
            window.location.href = "/login";
        })
        .catch((err) => {
            console.log(err)
            if (err.response.status === 409) {
                setEmailExists("Email already exists!")
            }
        })
    }

    return (
        <div className="container">
            <div className="text-center interFont" style={{ marginTop: '15rem' }}>
                <h1 className="interFont2">Register</h1>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <form style={{ marginTop: '2rem' }}>
                            <div className="form-group">
                                <input type="text" className="form-control p-3" ref={userName} rows="3" placeholder="Username" />
                                <input type="email" className="form-control p-3" ref={email} rows="3" placeholder="Email" required />
                                <input type="password" className="form-control p-3" rows="3" ref={password} placeholder="Password" />
                                <p className="colorRed mt-1">{emailExists}</p>
                            </div>
                            <button type="button" onClick={registerButton} className="btn btn-primary btn-lg interFont2 p-3 px-4" style={{ marginTop: '2rem' }}>Register</button>
                            <p className="mt-2">
                                <a className="loginOrRegisterHref" href="/login">Already have an account? Login</a>
                            </p>
                        </form>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen